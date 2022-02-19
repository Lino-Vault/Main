// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';

import './IStdReference.sol';

interface ICKBVault is IERC721, IERC721Enumerable {
  function safeCollateral(uint256 safeID) external view returns (uint256);

  function safeDebt(uint256 safeID) external view returns (uint256);

  function transfersafe(uint256 safeID, address to) external;

  function safeExists(uint256 safeID) external view returns (bool);

  function depositCollateral(uint256 safeID, uint256 amount) external;

  function depositCKB(uint256 safeID) external;

  function borrowToken(uint256 safeID, uint256 amount) external;

  function payBackToken(uint256 safeID, uint256 amount) external;

  function withdrawCollateral(uint256 safeID, uint256 amount) external;

  function destroysafe(uint256 safeID) external;

  function getPaid(address user) external;

  function getPrice(string memory base, string memory quote) external view returns (uint256);

  function getPricePeg() external view returns (uint256);

  function changeTreasury(address to) external;

  function setGainRatio(uint256 gainRatio_) external;

  function setDebtRatio(uint256 debtRatio_) external;

  function setDebtCeiling(uint256 debtCeiling_) external;

  function setPrice(IStdReference ref_) external;

  function setTokenPeg(uint256 tokenPeg_) external;

  function setClosingFee(uint256 amount) external;

  function setOpeningFee(uint256 amount) external;

  function setTreasury(uint256 treasury_) external;

  function setMinimumDebt(uint256 minimumDebt_) external;

  function setMintingPaused(bool paused_) external;

  function setMinimumCollateralPercentage(uint256 mcp_) external;

  function initialize(
    uint256 minimumCollateralPercentage_,
    IStdReference ref_,
    string memory name_,
    string memory symbol_,
    address token_,
    address stablecoin
  ) external;
}