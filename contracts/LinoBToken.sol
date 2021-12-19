// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract LinoBux is ERC20, ERC20Burnable, Ownable, AccessControl {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    address[] public vaults;

    constructor() ERC20("LinoBux", "LINOB") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(BURNER_ROLE, msg.sender);
    }

    // Token functions

    function mint(address account, uint256 amount) external onlyRole(
        MINTER_ROLE
        ) {
        _mint(account, amount);
    }

    function burn(address from, uint256 amount) external onlyRole(
        BURNER_ROLE) {
        _burn(from, amount);
    }

    function addMinter(address account) external onlyOwner {
        _setupRole(MINTER_ROLE, account);
    }

    // New
    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

}