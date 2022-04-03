pragma solidity ^0.5.16;
/* This contract is for HA to register under GDAC and VMC*/
contract hareg{
    struct details{
        string name;
        string HAaddress;
        address _add;
    }
    mapping(address => details) Det;
    function HA_registration(address _address, string memory _name, string memory _HAaddress) public{
        details memory detail;
        detail.name = _name;
        detail.HAaddress=_HAaddress;
        detail._add=_address;
        Det[_address]=detail;
    }
    
    function HA_details(address _address) view public returns(string memory name_, string memory ha_add){
        details memory detail=Det[_address];
        name_=detail.name;
        ha_add=detail.HAaddress;
        return(name_,ha_add);
        
    }
}