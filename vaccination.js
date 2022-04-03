// Source code to interact with smart contract

// web3 provider with fallback for old version
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
        // ask user for permission
        ethereum.enable()
        // user approved permission
    } catch (error) {
        // user rejected permission
        console.log('user rejected permission')
    }
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    // no need to ask for permission
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
  console.log (window.web3.currentProvider)
  
  // contractAddress and abi are setted after contract deploy
  var contractAddress = '0xA05667926D808C492FC98C67f68Cd7da0Ef498d4';
  var abi = JSON.parse( '[{"constant":false,"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Age","type":"uint256"},{"internalType":"uint256","name":"DateofBirth","type":"uint256"},{"internalType":"bool","name":"Dose1","type":"bool"},{"internalType":"bool","name":"Dose2","type":"bool"},{"internalType":"string","name":"VaccineName","type":"string"},{"internalType":"string","name":"Medical_Issues","type":"string"}],"name":"PersonDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_address1","type":"address"}],"name":"Person_Details","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_address1","type":"address"},{"internalType":"uint256","name":"Date","type":"uint256"},{"internalType":"string","name":"HA_name","type":"string"},{"internalType":"string","name":"HA_Address","type":"string"},{"internalType":"uint256","name":"vaccineID","type":"uint256"},{"internalType":"string","name":"DoctorName","type":"string"}],"name":"VaccineDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"ha","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]' );
  
  //contract instance
  contract = new web3.eth.Contract(abi, contractAddress);
  
  // Accounts
  var account;
  
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });
  
  //Smart contract functions
  function registerpersonInfo() {
    _add1 = $("#haaddress").val();
    name = $("#personname").val();
    age = $("#personage").val();
    DOB = $("#persondob").val();
    dose1 = $("#persondose1").val();
    dose2 = $("#persondose2").val();
    vacc = $("#vaccinename").val();
    medicalissues = $("#medicalissues").val();
    contract.methods.PersonDetails (_add1,name,age,DOB,dose1,dose2,vacc,medicalissues).send( {from: account}).then( function(tx) { 
      console.log("Transaction: ", tx); 
    });
  }

  function registerVaccineInfo(){
    _add = $("#haadd").val();
    date = $("#date").val();
    HAname = $("#haname").val();
    HAadd = $("#haaddr").val();
    vacid = $("#vacid").val();
    Dname = $("#docname").val();
    contract.methods.VaccineDetails (_add,date,HAname,HAadd,vacid,Dname).send( {from: account}).then( function(tx) { 
        console.log("Transaction: ", tx); 
      });
  }
  
  function registerGetInfo() {
    contract.methods.HA_details().call().then( function(name_,ha_add) { 
      console.log("name: ", name_);
      console.log("HAadress: ", ha_add);
      document.getElementById('lastname').innerHTML = name_;
      document.getElementById('lastaddress').innerHTML = ha_add;
    });    
  }
// web3 provider with fallback for old version
window.addEventListener('load', async () => {
    // New web3 provider
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // ask user for permission
            await ethereum.enable();
            // user approved permission
        } catch (error) {
            // user rejected permission
            console.log('user rejected permission');
        }
    }
    // Old web3 provider
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected');
    }
  });  