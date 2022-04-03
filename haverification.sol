pragma solidity ^0.5.16;
/* This smart contract is for HA for ntering vaccine information what they got*/

contract haverification{
    struct details{
        uint256 reqDate;
        string HAname;
        string HAadd;
        uint256 temp;
        uint256 vacid;
        uint256 conid;
        address _add;
    }
    
    struct vacdet{
        string vacc1;
        string vacc2;
        uint256 vac1;
        uint256 vac2;
        string vacc3;
        uint256 vac3;
        address _add1;
    }
    
    mapping(address => details) det;
    mapping(address => vacdet) vdet;
    
    function vaccinedetails( address _address, string memory vaccine1, string memory vaccine2,string memory vaccine3, 
    uint256 vaccine_1,uint256 vaccine_2,uint256 vaccine_3)public{
        
        vacdet memory vacd;
        vacd._add1=_address;
        vacd.vacc1=vaccine1;
        vacd.vacc2=vaccine2;
        vacd.vacc3=vaccine3;
        vacd.vac1=vaccine_1;
        vacd.vac2=vaccine_2;
        vacd.vac3=vaccine_3;
        vdet[_address]=vacd;
    }
    
    function VMCdata(address _address1) public view returns(string memory,string memory,string memory,
    uint256,uint256,uint256){
        return(vdet[_address1].vacc1,vdet[_address1].vacc2,vdet[_address1].vacc3,
        vdet[_address1].vac1,vdet[_address1].vac2,vdet[_address1].vac3);
    }
    
    function hadetails(address _address1,uint256 Date, 
    string memory HA_name, string memory HA_Address, uint256 vaccineID, uint256 ContainerID, uint256 Temperature) public{
        details memory vdetail;
        vdetail._add=_address1;
        vdetail.reqDate=Date;
        vdetail.HAname=HA_name;
        vdetail.HAadd=HA_Address;
        vdetail.vacid=vaccineID;
        vdetail.conid=ContainerID;
        vdetail.temp=Temperature;
        det[_address1]=vdetail;
    }
    
    function ha(address _address)public view returns(uint256, string memory,string memory,uint256, uint256,uint256){
        return(det[_address].reqDate,
        det[_address].HAname,det[_address].HAadd,det[_address].vacid,det[_address].conid,det[_address].temp);
    }
}