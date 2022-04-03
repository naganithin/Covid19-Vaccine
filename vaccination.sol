pragma solidity ^0.5.16;
/* This smart contract is for LA to enter details of vaccine what they have recieved*/

contract vaccination{
    
    struct persondetails{
        string name;
        uint256 age;
        uint256 DOB;
        bool dose1;
        bool dose2;
        string vacc;
        string medicalissues;
        address _add1;
    }
    
    mapping(address => persondetails) vdet;
    
    function PersonDetails( address _address, string memory Name, uint256 Age,
    uint256 DateofBirth, bool Dose1, bool Dose2, string memory VaccineName,string memory Medical_Issues)public{
        
        persondetails memory vacd;
        vacd._add1=_address;
        vacd.name=Name;
        vacd.age=Age;
        vacd.DOB=DateofBirth;
        vacd.dose1=Dose1;
        vacd.dose2=Dose2;
        vacd.vacc=VaccineName;
        vacd.medicalissues=Medical_Issues;
        vdet[_address]=vacd;
    }
    
    
    function Person_Details(address _address1) public view returns(string memory,
    uint256,uint256,bool,bool,string memory,string memory){
        return(vdet[_address1].name,vdet[_address1].age,vdet[_address1].DOB,vdet[_address1].dose1,vdet[_address1].dose2, vdet[_address1].vacc,
        vdet[_address1].medicalissues);
    }
    
    struct HAdetails{
        uint256 vacDate;
        string HAname;
        string HAadd;
        uint256 vacid;
        string Dname;
        address _add;
    }
    
    mapping(address => HAdetails) det;
    
    function VaccineDetails(address _address1,uint256 Date, 
    string memory HA_name, string memory HA_Address,
        uint256 vaccineID, string memory DoctorName) public{
        HAdetails memory vdetail;
        vdetail._add=_address1;
        vdetail.vacDate=Date;
        vdetail.HAname=HA_name;
        vdetail.HAadd=HA_Address;
        vdetail.vacid=vaccineID;
        vdetail.Dname=DoctorName;
        det[_address1]=vdetail;
    }
    
    function ha(address _address)public view 
    returns(uint256, string memory,string memory,uint256,string memory){
        return(det[_address].vacDate,
        det[_address].HAname,
        det[_address].HAadd,
        det[_address].vacid,
        det[_address].Dname);
    }
}