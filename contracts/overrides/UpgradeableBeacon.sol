// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/beacon/IBeaconUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';

contract UpgradeableBeacon is IBeaconUpgradeable, OwnableUpgradeable {
  address private _implementation;

  event Upgraded(address indexed childImplementation);

  function __UpgradeableBeacon__init(address implementation_)
    internal
    initializer
  {
    __Ownable_init_unchained();
    _setImplementation(implementation_);
  }

  function implementation() public view virtual override returns (address) {
    return _implementation;
  }

  function upgradeToNewVault(address newImplementation)
    public
    virtual
    onlyOwner
  {
    _setImplementation(newImplementation);
    emit Upgraded(newImplementation);
  }

  function _setImplementation(address newImplementation) internal {
    require(
      AddressUpgradeable.isContract(newImplementation),
      'UpgradeableBeacon: implementation is not a contract'
    );
    _implementation = newImplementation;
  }
}