// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol';
import '@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol';
import '@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

contract RetrieveRandomNumber is VRFConsumerBaseV2, ConfirmedOwner {
    event RequestSent(uint256 indexed requestId, uint32 indexed numWords);
    event RequestFulfilled(uint256 indexed requestId, uint256[] indexed randomWords);
    bytes32 keyHash = 0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd;
     // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;
    uint64 s_subscriptionId;
    uint32 callbackGasLimit = 500000;
    uint16 requestConfirmations = 5;
    uint32 numWords = 3;
    address public predictionAddress;
    struct RequestStatus {
        bool fulfilled; 
        bool exists;
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus) public s_requests;
    VRFCoordinatorV2Interface COORDINATOR;

   function setAddresses(address _predictionAddress) external onlyOwner {
       setPredictionAddress(_predictionAddress);
   }

    function setPredictionAddress(address _predictionAddress) internal {
        predictionAddress = _predictionAddress;
    }


    function setSubscriptionId(uint64 subscriptionId) external onlyOwner {
         s_subscriptionId = subscriptionId;
    }


    constructor(uint64 subscriptionId) ConfirmedOwner(msg.sender) VRFConsumerBaseV2(0xAE975071Be8F8eE67addBC1A82488F1C24858067) {
        COORDINATOR = VRFCoordinatorV2Interface(0xAE975071Be8F8eE67addBC1A82488F1C24858067);
        s_subscriptionId = subscriptionId;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() public returns (uint256 requestId) {
        require(msg.sender == predictionAddress, "USER_CANT_CALL_FUNCTION");
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({randomWords: new uint256[](0), exists: true, fulfilled: false});
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
        require(s_requests[_requestId].exists, 'request not found');
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus() public view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[lastRequestId].exists, 'request not found');
        RequestStatus memory request = s_requests[lastRequestId];
        return (request.fulfilled, request.randomWords);
    }

}
