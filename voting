pragma solidity >= 0.7.0;
//map a proposal ID to a specific proposal 
mapping( uint => proposal) public proposal;
//map a proposal ID to a voter's address and their vote
mapping(uint=>mapping(address => bool)) public  voted;
//Determine if the user is blocked from voting 
mapping (address => uint) proposal;
 struct proposal{
     uint votesRecieved;
     bool passed;
     address submitter;
     uint votingDeadline
 }

///allow a token holder to submit a proposalto vote on 
function submitProposal() public
onlyEligibleVoter (msg.sender)
whenNotBlocked(msg.sender)
returns (uint proposalID)
{
    votesRecieved =
    token.balanceOf(msg.sender);
    proposalID =
    addProposal (votesRecieved);
    emit
    proposalSubmitted(proposalID);
    return proposalID;
}
modifier onlyEligibleVoter(address_voter){
    balance = token.balanceOf(_voter);
require(balance > 0);_;
}
///@dev add a new proposal to the proposal mapping 
///@param votesRecieved from the user submitting the proposal
function addProposal(uint_votesRecieved) internal
returns (uint proposalID)
{
    votes = _votesRecieved;
    if (votes < votesNeeded) {
        if (proposalID ==0){
            proposalIDcount = 1;
        }
    }
}
proposalID = proposalIDcount;
proposal[propossalID] = proposal ({
    votesRecieved : votes,
    passed: false,
    submitter: msg.sender,
    votingDeadline: now + voteLength
});
blocked[mag.sender] = proposalID;
voted[proposalID]
[msg.sender]= true;
proposalIDcount = proposalIDcount.add(1);
return proposalID;
}
else {
    require(token.balanceOf(msg.sender) >= votesNeeded);
    endVotes(proposalID);
    return proposalID;
}
}
