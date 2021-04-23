pragma solidity  ^0.7.0;
pragma experimental ABIEncoderV2;

contract VotingCharityToken {
    string  public name;                        // Sets the name for display purposes
    string  public symbol;                            // Sets the symbol for display purposes
    uint256 public totalSupply;                //Updates total supply (100000 for example)
    uint8   public decimals;                              // Amount of decimals for display purposes
    address voteAddress = 0x0000000000000000000000000000000000000000;
    address owner;
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    struct VoteProfile {
        uint vote_casted;
        uint vote_allowed;
    }

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;
    mapping(address => VoteProfile) public votes;
    
    modifier onlyOwner {
      require(msg.sender == owner, "Only contract owner is permitted");
      _;
    }

    constructor() public {
        // balances[msg.sender] = 100000000;
        balances[msg.sender] = 100000000;              
        totalSupply = 100000000;                      
        name = "Voting Charity Token";    
        decimals = 0;           
        symbol = "VCT"; 
        owner = msg.sender; 
    }
    /// return total amount of tokens
    // function totalSupply() public view returns (uint256) {
    //     return totalSupply;
    // }
    /// _owner The address from which the balance will be retrieved
    /// return The balance
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
    
    /// sends a certain `_value` of token to `_to` from `msg.sender`
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value, "You have insufficient balance");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    /// `msg.sender` approves `_addr` to spend a certain `_value` tokens
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
	
	/// return amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
	}
	
    /// sends a certain `_value` of token to `_to` from `_from` 
	/// on the condition it is approved by `_from`
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balances[_from], "You have insuffient balance");
        require(_value <= allowed[_from][msg.sender], "You are not permitted to send that amount");
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function setVoteProfile(address voterAddress, uint256 vote_allowed, uint256 vote_casted) public returns (bool success) {
        votes[voterAddress] = VoteProfile(vote_allowed, vote_casted);
        return true;
    }

    function getVoteProfile(address voterAddress) public view returns (VoteProfile memory v_profile) {
        return votes[voterAddress];
    }

    function vote(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balances[_from], "You have insufficient balance");
        require(_value <= allowed[_from][msg.sender], "You are not allowed to send this amount");
        require(votes[_from].vote_allowed <= votes[_from].vote_casted + _value, "You have exhausted your daily vote allowance");
        require(_to == voteAddress, "You can only vote by sending to zero address");
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        votes[_from].vote_casted += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
    function updateVoteAllowed(address voterAddress, uint256 vote_allowed) public onlyOwner returns (bool success) {
        votes[voterAddress].vote_allowed = vote_allowed;
        return true;
    }

} 
