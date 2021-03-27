pragma solidity ^0.5.0;

contract CharityToken {
    string  public name = "Charity Token";                        // Set the name for display purposes
    string  public symbol = "CHT";                            // Set the symbol for display purposes
    uint256 public totalSupply_ = 100000000;                //Update total supply (100000 for example)
    uint8   public decimals = 18;                              // Amount of decimals for display purposes

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

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    constructor() public {
        balances[msg.sender] = totalSupply_;
    }
    /// return total amount of tokens
    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }
    /// _owner The address from which the balance will be retrieved
    /// return The balance
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
    
    /// sends a certain `_value` of token to `_to` from `msg.sender`
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
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
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}