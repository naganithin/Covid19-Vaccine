pragma solidity ^0.5.16;
/* This smart contract is vaccine registration form for HA*/

contract havaccine{
    
    struct details{
        string vacc1;
        string vacc2;
        uint256 vac1;
        uint256 vac2;
        string vacc3;
        uint256 vac3;
        uint256 reqDate;
        string HAname;
        string HAadd;
        address _add;
    }
    
    mapping (address => details) det;
    
    function hareq(address _address, string memory vacc1_,string memory vacc2_,  uint256 vac1_,uint256 vac2_, uint256 reqDate_, string memory HAname_, string memory HAadd_ ) public{
        details memory vac;
        vac._add= _address;
        vac.vacc1 = vacc1_;
        vac.vacc2 = vacc2_;
        vac.vac1=vac1_;
        vac.vac2=vac2_;
        vac.reqDate=reqDate_;
        vac.HAname=HAname_;
        vac.HAadd=HAadd_;
        det[_address]=vac;
    }
    
    function retHAreq(address _address) view public returns(string memory,string memory, uint256,uint256, uint256, string memory, string memory){
        return(det[_address].vacc1,det[_address].vacc2,det[_address].vac1,det[_address].vac2, det[_address].reqDate, det[_address].HAname, det[_address].HAadd);
    }
}