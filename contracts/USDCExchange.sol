// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import './interfaces/ILino.sol';

contract USDCExchange is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    using SafeERC20 for IERC20;
    using SafeERC20 for IStablecoin;

    IERC20 public usdc;
    IStablecoin public lino;

    uint256 public usdcRate;
    uint256 public linoRate;
    address public treasury;

    uint256 public hourlyLimit;
    mapping(uint256 => uint256) accumulatedLINO;

    event Mint(address minter, uint256 amount, uint256 fee);
    event Redeem(address redeemer, uint256 amount, uint256 fee);
    event ChangeTreasury(address newTreasury);
    event ChangeHourlyLimit(uint256 newHourlyLimit);
    event ChangeUSDCRate(uint256 newUSDCRate);
    event ChangeLINORate(uint256 newLINORate);

    function initialize(address usdc_, address lino_) public initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __ReentrancyGuard_init_unchained();

        usdc = IERC20(usdc_);
        lino = IStablecoin(lino_);
        linoRate = 9925;
        usdcRate = 10075;
        treasury = msg.sender;
    }

//Change Treasury address

    function changeTreasury(address newTreasury) public onlyOwner {
        require(newTreasury != address(0), 'Treasury can not be zero address');
        treasury = newTreasury;
        emit ChangeTreasury(newTreasury);
    }

// Set rate for USDC to Lino

    function setUSDCRate(uint256 _rate) public onlyOwner {
        require(_rate <= 10100 && _rate >= 10000, 'Must be 0-1% fee');
        usdcRate = _rate;
        emit ChangeUSDCRate(_rate);
    }

// Set rate for lino to USDC

    function setLinoRate(uint256 _rate) public onlyOwner {
        require(_rate <= 10000 && _rate >= 9900, 'Must be 0-1% fee');
        linoRate = _rate;
        emit ChangeLINORate(_rate);
    }

// Set the rate that Lino is traded for USDC

    function setHourlyLimit(uint256 _limit) public onlyOwner {
        hourlyLimit = _limit;
        emit ChangeHourlyLimit(_limit);
    }

// Returns the current supply of USDC in the contract.

    function usdReserves() public view returns (uint256) {
        return usdc.balanceOf(address(this));
    }

// Mints 1 LINO for 1.0075 USDC
    function mint(uint256 amount) public nonReentrant {
        require(amount != 0, 'Cannot mint 0 Lino');

        uint256 fee = amount - (amount * 1e4) / usdcRate;
        uint256 amountToSend = (amount * 1e16) / usdcRate;

        if (lino.totalSupply() > 1000000e18) {
            uint256 period = block.timestamp / (60 * 60); 
            require(
                accumulatedLINO[period] + amountToSend <=
                    (lino.totalSupply() * hourlyLimit) / 10000,
                'Too much LINO minted this hour'
            );
            accumulatedLINO[period] += amountToSend;
        }

        usdc.safeTransferFrom(msg.sender, address(this), amount);

        usdc.safeTransfer(treasury, fee);

        lino.mint(msg.sender, amountToSend);
        emit Mint(msg.sender, amountToSend, fee);
    }

// Exchanges 1 LINO for 0.9925 USDC

    function redeem(uint256 amount) public nonReentrant {
        require(amount != 0, 'Cannot redeem 0 USDC');
        require(usdc.balanceOf(address(this)) != 0, 'Not enough USDC in reserves');
        require(usdc.balanceOf(address(this)) >= amount / 1e12, 'Not enough USDC in reserves');

        uint256 amountToSend = (amount * linoRate) / (1e16);
        uint256 fee = amount / 1e12 - amountToSend;

        // Burn excess, keep fee
        lino.burn(msg.sender, amount);

        usdc.safeTransfer(msg.sender, amountToSend);

        usdc.safeTransfer(treasury, fee);
        emit Redeem(msg.sender, amountToSend, fee);
    }
}
