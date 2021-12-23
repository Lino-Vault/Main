// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol';
import '@openzeppelin/contracts/utils/Address.sol';

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';

import './interfaces/IStablecoin.sol';
import './interfaces/IStdReference.sol';

contract LinoBVault is  
    Initializable,
    ERC721Upgradeable,
    ReentrancyGuardUpgradeable,
    ERC721EnumerableUpgradeable,
    AccessControlUpgradeable {

    using SafeERC20 for IERC20Metadata;
    using SafeERC20 for IStablecoin;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _userSafeIds;

    bytes32 public constant TREASURY_ROLE = keccak256('TREASURY_ROLE');

    uint256 public totalDebt;
    uint256 public closingFee;
    uint256 public openingFee;
    uint256 public tokenPeg;
    uint256 public debtCeiling;
    uint256 public minimumCollateralPercentage;
    uint256 public totalDeposits;

    //For liquidation
    uint256 public debtRatio;
    uint256 public gainRatio;
    mapping(address => uint256) public tokenDebt;

    //Token provided as debt
    IStablecoin internal stablecoin;
    //Token given as collateral
    IERC20Metadata public token;
    //Band Oracle source
    IStdReference public ref;

    //Safe that is the treasury
    uint256 public treasury;

    //Safe information
    mapping(uint256 => bool) private safeExistence;
    mapping(uint256 => uint256) public safeCollateral;
    mapping(uint256 => uint256) public safeDebt;

    //Minimum debt
    uint256 public minimumDebt;

    //Pausing the minting of Linob
    bool public mintingPaused;

    //Events for safe operations
    event CreateSafe(uint256 safeID, address creator);
    event DestroySafe(uint256 safeID);
    event TransferSafe(uint256 safeID, address from, address to);

    //Safe Liquidation
    event LiquidateSafe(
        uint256 safeID,
        address owner,
        address buyer,
        uint256 amountPaid,
        uint256 tokenExtract,
        uint256 closingFee
        );

    //Events for collateral
    event DepositCollateral(uint256 safeID, uint256 amount);
    event WithdrawCollateral(uint256 safeID, uint256 amount);
    event DepositCKB(uint256 safeID, uint256 amount);

    //Events for stablecoin action
    event BorrowToken(uint256 safeID, uint256 amount);
    event PaybackToken(uint256 safeID, uint256 amount, uint256 closingFee);

    //Vault Events
    event GetPaid(uint256 amount, address user);
    event ChangeGainRatio(uint256 newGainRatio);
    event ChangeDebtRatio(uint256 newDebtRatio);
    event NewPeg(uint256 newPeg);
    event NewDebtCeiling(uint256 newDebtCeiling);
    event NewClosingFee(uint256 newClosingFee);
    event NewOpeningFee(uint256 newOpeningFee);
    event NewMinimumDebt(uint256 newMinimumDebt);
    event NewPrice(address newPrice);
    event NewTreasury(uint256 newTreasury);
    event BankPaused(bool mintingPaused);
    event NewMinimumCollateralPercentage(uint256 newMinimumCollateralPercentage);



    address public stableCoinAddress = 0x76FebBBE670De113b78858edB2a831A63fB9bB06;
    LinoBToken public stableContract = LinoBToken(stableCoinAddress);


    mapping (address => uint256) public depositAmount;
    mapping (address => uint256) public stableCoinAmount;
    mapping(address => uint256) public stableCoinDebt;
    mapping (address => uint256) public ckb_ratio;

    function initialize(
        uint256 minimumCollateralPercentage_,
        IStdReference ref_,
        string memory name_,
        string memory symbol_,
        address token_,
        address stablecoin_
        ) public initializer {
        __Context_init_unchained();
        __ERC165_init_unchained();
        __ERC721_init_unchained(name_, symbol_);
        __ERC721Enumerable_init_unchained();
        __ReentrancyGuard_init_unchained();
        __AccessControl_init_unchained();
        
        assert(address(ref_) != address(0));
        assert(minimumCollateralPercentage_ >= 100);

        //Starting settings
        debtCeiling = 10e18; // 10 dollars
        closingFee = 75; // 0.75%
        openingFee = 0; // 0.0%
        tokenPeg = 1e8; // $1
        debtRatio = 2; // 50%
        gainRatio = 11; // 1.1 or 10%

        ref = ref_;

        token = IERC20Metadata(token_);
        stablecoin = IStablecoin(stablecoin_);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(TREASURY_ROLE, msg.sender);
        _setRoleAdmin(TREASURY_ROLE, TREASURY_ROLE);

        minimumCollateralPercentage = minimumCollateralPercentage_;
    }

    modifier onlySafeOwner(uint256 safeID) {
        require(safeExistence[safeID], 'Safe does not exist');

        require(ownerOf(safeID) == msg.sender, 'Safe is not owned by you');
        _;
    }

    modifier onlyUser(address user) {
        require(msg.sender == user, 'Cannot get paid if not user');
        _;
    }

    modifier mintingNotPaused() {
        require(!mintingPaused, 'Minting for this vault is paused.');
        _;
    }

    function safeExists(uint256 safeID) public view returns (bool) {
        return safeExistence[safeID];
    }

    function setMinimumCollateralPercentage(uint256 mcp_) 
    external 
    onlyRole(TREASURY_ROLE) {
        require(
            mcp_ >= 120 && mcp_ <= 400,
            'Minimum collateral percentage must be between 120-400'
            );
        minimumCollateralPercentage = mcp_;
        emit NewMinimumCollateralPercentage(mcp_);
    }

    function setMinimumDebt(uint256 minimumDebt_)
    external
    onlyRole(TREASURY_ROLE) {
        require(minimumDebt_ > 0, 'Minimum debt cannot be zero');
        require(minimumDebt < debtCeiling,
            'Minimum debt cannot be greater than debt ceiling'
            );
        minimumDebt = minimumDebt_;
        emit NewMinimumDebt(minimumDebt);
    }

    function setDebtCeiling(uint256 debtCeiling_)
    external
    onlyRole(TREASURY_ROLE) {
        require(
            debtCeiling <= debtCeiling_,
            'setCeiling: Must be over the amount of the current debt ceiling'
            );
        debtCeiling = debtCeiling_;
        emit NewDebtCeiling(debtCeiling_);
    }

    function setPrice(IStdReference ref_) 
    external 
    onlyRole(TREASURY_ROLE) {
        require(address(ref_) != address(0),
            'Price source cannot be zero address'
            );
        ref = ref_;
        emit NewPrice(address(ref_));
    }

    function setTokenPeg(uint256 tokenPeg_) external onlyRole(TREASURY_ROLE) {
        require(tokenPeg_ > 0, 'Peg cannot be zero');
        tokenPeg = tokenPeg_;
        emit NewPeg(tokenPeg_);
    }

    function setClosingFee(uint256 amount) external onlyRole(TREASURY_ROLE) {
        require(amount <= 250, 'Closing fee cannot be above 1%');

        closingFee = amount;
        emit NewClosingFee(amount);
    }

    function setOpeningFee(uint256 amount) external onlyRole(TREASURY_ROLE) {
        openingFee = amount;
        emit NewOpeningFee(amount);
    }

    function setTreasury(uint256 treasury_) external onlyRole(TREASURY_ROLE) {
        require(safeExistence[treasury_], 'Safe does not exist');
        treasury = treasury_;
    }

    function setMintingPaused(bool paused_) external onlyRole(TREASURY_ROLE) {
        require(paused_ == !mintingPaused, 'Minting already paused');
        mintingPaused = paused_;
    }

    function getPrice(string memory base, string memory quote) public view returns (uint256){
        IStdReference.ReferenceData memory data = ref.getReferenceData(base,quote);
        return data.rate;
    }

    function getPricePeg() public view returns (uint256) {
        return tokenPeg;
    }

    function calculateCollateralProperties(uint256 collateral, uint256 debt)
    internal
    view
    returns (uint256, uint256) {
        require(uint256(getPrice("CKB", "USD")) != 0, 'Price must be above 0');
        require(getPricePeg() != 0, 'Peg must be above 0');

        //Calculate collateral value
        uint256 collateralValue = collateral * (uint256(getPrice("CKB", "USD")/1e10));

        // Calculate current debt value in our token ie usdc
        uint256 debtValue = debt * getPricePeg();

        //Multiply collateral by 100
        uint256 collateralValueTimes100 = collateralValue * 100;

        return (collateralValueTimes100, debtValue);
    }

    //Checks if current collateral is valid
    function isValidCollateral(uint256 collateral, uint256 debt)
    internal
    view
    returns (bool) {
        (uint256 collateralValueTimes100, 
            uint256 debtValue) = calculateCollateralProperties(collateral, debt);

        require(debtValue >= 0, 'Debt must be above 0');

        uint256 collateralPercentage = collateralValueTimes100 * 10**(8-8) / debtValue;

        //Check if it is above the minimum i.e 220
        return collateralPercentage >= minimumCollateralPercentage;
    }

    //Function to create safes to use on the platform
    function createSafe() external {
        _userSafeIds.increment();
        //Assign ID to safe
        uint256 newSafeId = _userSafeIds.current();

        safeExistence[newSafeId] = true;

        emit CreateSafe(newSafeId, msg.sender);
        //mint erc721 safe
        _mint(msg.sender, newSafeId);
    }

    function safeCounts() external view returns (uint256) {
        return _userSafeIds.current();
    }

    //User can destroy their safe. Returns collateral

    function destorySafe(uint256 safeID)
    external
    virtual
    onlySafeOwner(safeID)
    nonReentrant {
        require(safeDebt[safeID] == 0, ' Safe has outstanding debt');

        uint256 collateral = safeCollateral[safeID];

        _burn(safeID);
        delete safeExistence[safeID];
        delete safeCollateral[safeID];
        delete safeDebt[safeID];

        if(collateral != 0) {
            address payable to = payable(msg.sender);
            to.transfer(collateral);
        }

        emit DestroySafe(safeID);
    }

    //Transfer safe to a different address

    function transferSafe(uint256 safeID, address to) 
    external
    onlySafeOwner(safeID) {
        //burn the erc721
        _burn(safeID);
        //mint new erc721
        _mint(to, safeID);

        emit TransferSafe(safeID, msg.sender, to);
    }

    //Allows vault owner to deposit ERC20 collateral
    function depositCollateral(uint256 safeID, uint256 amount)
    external
    onlySafeOwner(safeID) {
        token.safeTransferFrom(msg.sender, address(this), amount);

        uint256 newCollateral = safeCollateral[safeID] + amount;

        assert(newCollateral >= safeCollateral[safeID]);

        safeCollateral[safeID] = newCollateral;

        emit DepositCollateral(safeID, amount);
    }

  /**
   * @dev Lets a vault owner borrow stablecoin against collateral
   *
   * Requirements:
   * - Vault type must exist
   * - Vault must exist
   * - Must borrow greater than 0 stablecoin
   * - Must be below the debt ceiling when borrowing
   * - Must maintain minimum collateral percentage
   *
   * Emits BorrowToken event
   */
   function borrowToken(uint256 safeID, uint256 amount)
   external
   payable
   onlySafeOwner(safeID)
   nonReentrant
   mintingNotPaused {
    require(amount > 0, 'Must borrow more than zero');
    require(
        totalDebt + amount <= debtCeiling,
        'Cannot mint over debt ceiling'
        );

    uint256 newDebt = safeDebt[safeID] + amount;

    require(
        isValidCollateral(safeCollateral[safeID], newDebt),
        'Borrow would put safe below minimum collateral percentage'
        );

    require(
        newDebt >= minimumDebt,
        'Borrow needs to be larger than minimum'
        );

    //Mint stablecoin for the user
    _addSafeDebt(safeID, amount);
    //should have minter role
    stablecoin.mint(msg.sender, amount);
    emit BorrowToken(safeID, amount);
   }

/**
   * @dev allows vault owner to withdraw the collateral
   *
   * Requirements:
   * - Withdraw amount is less than or equal to current collateral
   * - Collateral withdrawal amount does not put debt below minimum collateral
   *
   * Emits WithdrawCollateral event
   */
   function withdrawCollateral(uint256 safeID, uint256 amount)
   external
   onlySafeOwner(safeID)
   nonReentrant {
    require(
        safeCollateral[safeID] >= amount,
        'Safe does not have enough collateral'
        );

    uint256 newCollateral = safeCollateral[safeID] - amount;

    if(safeDebt[safeID] != 0) {
        require(
            isValidCollateral(newCollateral, safeDebt[safeID]),
            'Withdraw would put safe below mcp!'
            );
    }

    address payable to = payable(msg.sender);
    to.transfer(amount);

    safeCollateral[safeID] = newCollateral;


    emit WithdrawCollateral(safeID, amount);
   }

  /**
   * @dev Pay back the stablecoin to reduce debt
   *
   * Requirements:
   * - User must have enough balance to repay `amount`
   * - Cannot pay back more than the required debt. `amount` must be less than debt.
   */
   function paybackToken(uint256 safeID, uint256 amount)
   external
   onlySafeOwner(safeID)
   nonReentrant {

    require(
        stablecoin.balanceOf(msg.sender) >= amount,
        'Token balance too low'
        );

    require(
        safeDebt[safeID] >= amount,
        'Vault debt less than amount to pay back'
        );

    //Clossing fee calculation
    uint256 _closingFee = ((amount*closingFee) * getPricePeg()) /
        ((uint256(getPrice("CKB", "USD")/1e10)) * 10000) /
        (10**(8-8));

    _subSafeDebt(safeID, amount);
    _subSafeCollateral(safeID, _closingFee);
    _addSafeCollateralTreasury(_closingFee);

    stablecoin.burn(msg.sender, amount);

    emit PaybackToken(safeID, amount, _closingFee);
   }

   function depositCKB(uint256 safeID)
   external
   payable
   onlySafeOwner(safeID) {
        uint256 newCollateral = safeCollateral[safeID] + msg.value;

        assert(newCollateral >= safeCollateral[safeID]);

        safeCollateral[safeID] = newCollateral;

        emit DepositCKB(safeID, msg.value);
    }

    function _addSafeCollateralTreasury(uint256 amount) internal {
        uint256 newCollateral = safeCollateral[treasury] + amount;
        assert(newCollateral >= safeCollateral[treasury]);

        safeCollateral[treasury] = newCollateral;
    }

    function _subSafeCollateral(uint256 safeID, uint256 amount) internal {
        require(
            amount <= safeCollateral[safeID],
            'Cannot remove more than deposited collateral'
            );

        uint256 newCollateral = safeCollateral[safeID] - amount;

        assert(newCollateral <= safeCollateral[safeID]);

        safeCollateral[safeID] = newCollateral;
    }


    // Adds debt to the safe
    // Requirements:
    // new user debt cannot be above debt ceiling
    function _addSafeDebt(uint256 safeID, uint256 amount) internal {
        uint256 newTotalDebt = amount + totalDebt;

        assert(newTotalDebt >= totalDebt);
        require(newTotalDebt <= debtCeiling, 'Cannot exceed debt ceiling');

        uint256 userNewDebt = amount + safeDebt[safeID];
        assert(userNewDebt >= safeDebt[safeID]);

        _addToTotalDebt(amount);

        safeDebt[safeID] = userNewDebt;
    }

    function _subSafeDebt(uint256 safeID, uint256 amount) internal {
        require(totalDebt >= amount, 'Cannot remove more debt than exists');

        require(safeDebt[safeID] >= amount, 'Cannot remove more debt that current');

        uint256 newTotalDebt = totalDebt - amount;
        assert(newTotalDebt <= totalDebt);

        uint256 userNewDebt = safeDebt[safeID] - amount;
        assert(userNewDebt <= safeDebt[safeID]);

        _subFromTotalDebt(amount);
        safeDebt[safeID] = userNewDebt;
    }

    //Adds debt to total amount
    function _addToTotalDebt(uint256 amount) internal {
        uint256 newDebt = totalDebt + amount;
        require(newDebt <= debtCeiling, 'Debt can not be higher than ceiling');

        totalDebt = newDebt;
    }

    //Subtrcts debt from total debt amount
    function _subFromTotalDebt(uint256 amount) internal {
        require(amount <= totalDebt, 'Debt can not go below 0');
        uint256 newDebt = totalDebt - amount;

        totalDebt = newDebt;
    }

    function _transfer(
    address from,
    address to,
    uint256 tokenId
  ) internal pure override {
    revert('transfer: disabled');
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721Upgradeable,ERC721EnumerableUpgradeable,AccessControlUpgradeable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

}

abstract contract LinoBToken {
    function mint(address to, uint256 amount) public virtual;
    function burn(uint256 amount) public virtual;
    function transferFrom(address sender, address recipient, uint256 amount) external virtual returns (bool);
    function balanceOf(address account) public virtual returns (uint256);
}