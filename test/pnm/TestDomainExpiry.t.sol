// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TestDomain.t.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// This PNM logic test is to check
// a child domain's lifespan is always shorter than
// that of its parent domain.
contract TestDomainExpiry is TestDomain {
    bytes32 pnmId;
    bytes32 subId;
    bytes32 subSubId;

    function setUp() public {
        // Step 1. Deploy all the smart contracts
        deploy();

        // Step 2. Register pnm.eth
        pnmId = registerNode("pnm");

        // Step 3. Register sub.pnm.eth
        subId = registerSubNode(pnmId, "sub");

        // Step 4. Register subsub.sub.pnm.eth
        subSubId = registerSubNode(subId, "subsub");
    }

    function check() public override {
        uint256 parentExpiry = expiry(subId);
        uint256 childExpiry = expiry(subSubId);

        // INVARIANT
        require(
            parentExpiry >= childExpiry,
            string(
                abi.encodePacked(
                    "[!!!] Invariant broken: Sub domain (",
                    Strings.toString(childExpiry),
                    ") lives longer than its parent (",
                    Strings.toString(parentExpiry),
                    ")"
                )
            )
        );
    }
}
