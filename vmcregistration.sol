pragma solidity ^0.5.16;
/* This contract is for VMC for registering under GDAC */
contract vmcregistration{
    struct VMCdetails{
        string name;
        string typeVaccine;
        string VMCaddress;
        address _add;
    }
    mapping (address => VMCdetails) vmcdet;
   
    function VMC_registration(address _address, string memory _name, string memory _type, string memory _VMCaddress ) public {
        VMCdetails memory vmc;
        vmc.name = _name;
        vmc.typeVaccine=_type;
        vmc.VMCaddress=_VMCaddress;
        vmc._add=_address;
        vmcdet[_address]=vmc;
    }
    
    function VMC_details(address _address) view public returns(string memory,string memory,string memory){
        return(vmcdet[_address].name,vmcdet[_address].typeVaccine,vmcdet[_address].VMCaddress);
    }
}
