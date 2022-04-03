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
  var contractAddress = '0xbCF317b6d5d5D284e617Ab968240C7e40df779Dd';
  var abi = JSON.parse( '[{"constant":true,"inputs":[{"internalType":"address","name":"_address1","type":"address"}],"name":"VMCdata","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"ha","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_address1","type":"address"},{"internalType":"uint256","name":"Date","type":"uint256"},{"internalType":"string","name":"HA_name","type":"string"},{"internalType":"string","name":"HA_Address","type":"string"},{"internalType":"uint256","name":"vaccineID","type":"uint256"},{"internalType":"uint256","name":"ContainerID","type":"uint256"},{"internalType":"uint256","name":"Temperature","type":"uint256"}],"name":"hadetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"vaccine1","type":"string"},{"internalType":"string","name":"vaccine2","type":"string"},{"internalType":"string","name":"vaccine3","type":"string"},{"internalType":"uint256","name":"vaccine_1","type":"uint256"},{"internalType":"uint256","name":"vaccine_2","type":"uint256"},{"internalType":"uint256","name":"vaccine_3","type":"uint256"}],"name":"vaccinedetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );
  
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
  function registerNHAInfo() {
    _add = $("#haaddress").val();
    reqDate = $("#date").val();
    name = $("#haname").val();
    HAaddress = $("#addressha").val();
    temp = $("#temperature").val();
    vacid = $("#vaccineid").val();
    conid = $("#containerid").val();
    contract.methods.hadetails (_add,reqDate,name,HAaddress,temp,vacid,conid).send( {from: account}).then( function(tx) { 
      console.log("Transaction: ", tx);  
    });
  }

  function registerVaccineInfo(){
    _add1 = $("#haadd").val();
    vacc1 = $("#vac1").val();
    vacc2 = $("#vac2").val();
    vacc3 = $("#vac3").val();
    vac1 = $("#novac1").val();
    vac2 = $("#novac2").val();
    vac3 = $("#novac3").val();
    contract.methods.vaccinedetails (_add1,vacc1,vacc2,vacc3,vac1,vac2,vac3).send( {from: account}).then( function(tx) { 
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