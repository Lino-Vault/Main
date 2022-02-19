// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';

import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

import './interfaces/ICKBVault.sol';
import './interfaces/IStdReference.sol';
import './CKBVault.sol';

contract Lino is 
    Initializable, 
    ERC20Upgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    ERC20PermitUpgradeable 
{
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    address[] public vaults;

    CKBVault private ckbv;

    mapping(bytes32 => EnumerableSet.AddressSet) private _roleMembers;

    event CreateSafeType(address token, uint256 minimumCollateralPercentage, IStdReference ref_, string name, address vault);

    function initialize(string memory name) public initializer {
        __Context_init_unchained();
        __ERC165_init_unchained();
        __AccessControl_init_unchained();
        __ERC20_init_unchained(name, name);
        __Pausable_init_unchained();
        __EIP712_init_unchained(name, '1');
        __ERC20Permit_init_unchained(name);
        // Treasury
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
    }

    function vaultCount() external view returns (uint256) {
        return vaults.length;
    }

    function burn(address from, uint256 amount) external onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }


    // Token functions

    function mint(address account, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(account, amount);
    }
  /**
   * @dev Adds a vault after creation for book keeping on the stablecoin
   */
  function addVault(
    uint256 minimumCollateralPercentage_,
    IStdReference ref_,
    string calldata name_,
    string calldata symbol_,
    address token_
  ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    address vault = address(
      new CKBVault()
    );

    ckbv = CKBVault(vault);
    ckbv.initialize(minimumCollateralPercentage_, ref_, name_, symbol_, token_);
    
    vaults.push(vault);

    _setupRole(BURNER_ROLE, vault);
    // Allow the bank to burn stablecoin
    _setupRole(MINTER_ROLE, vault);

    

    emit CreateSafeType(
      token_,
      minimumCollateralPercentage_,
      ref_,
      name_,
      vault
    );
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
        ) internal override(ERC20Upgradeable) {
        super._beforeTokenTransfer(from, to, tokenId);
        require(!paused(), 'Pausable: token transfer while paused');
    }

    // Vault Stuff

    function setMinimumDebt(uint256 vaultID, uint256 gainRatio_) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setGainRatio(gainRatio_);
    }

    function setDebtRatio(uint256 vaultID, uint256 debtRatio_) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setDebtRatio(debtRatio_);
    }

    function setDebtCeiling(uint256 vaultID, uint256 debtCeiling_) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setDebtCeiling(debtCeiling_);
    }

    function setPrice(uint256 vaultID, IStdReference ref_) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setPrice(ref_);
    }

    function setTokenPeg(uint256 vaultID, uint256 tokenPeg_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        ICKBVault(vaults[vaultID]).setTokenPeg(tokenPeg_);
    }

    function setMinimumCollateralPercentage(uint256 vaultID, uint256 mcp_) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setMinimumCollateralPercentage(mcp_);
    }

    function setClosingFee(uint256 vaultID, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setClosingFee(amount);
    }

    function setOpeningFee(uint256 vaultID, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setOpeningFee(amount);
    }

    function setTreasury(uint256 vaultID, uint256 treasury_) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setTreasury(treasury_);
    }

    function setMintingPaused(uint256 vaultID, bool paused_) external onlyRole(DEFAULT_ADMIN_ROLE)
    {
        ICKBVault(vaults[vaultID]).setMintingPaused(paused_);
    }

    function getRoleMember(bytes32 role, uint256 index) public view returns (address)
    {
        return _roleMembers[role].at(index);
    }

    function getRoleMemberCount(bytes32 role) public view returns (uint256) {
        return _roleMembers[role].length();
    }

    function grantRole(bytes32 role, address account) public virtual override(AccessControlUpgradeable)
    {
        super.grantRole(role, account);
        _roleMembers[role].add(account);
    }

    function revokeRole(bytes32 role, address account) public virtual override(AccessControlUpgradeable)
    {
        super.revokeRole(role, account);
        _roleMembers[role].remove(account);
    }

    function renounceRole(bytes32 role, address account) public virtual override(AccessControlUpgradeable)
    {
        super.renounceRole(role, account);
        _roleMembers[role].remove(account);
    }

    function _setupRole(bytes32 role, address account) internal virtual override{
        super._setupRole(role, account);
        _roleMembers[role].add(account);
    }

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

}