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
  var contractAddress = '0xab92e92DF9e0b0a9aFdf8716B3a4Bc8A5D4C13f8';
  var abi = JSON.parse( '[{"constant":false,"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"vacc1_","type":"string"},{"internalType":"string","name":"vacc2_","type":"string"},{"internalType":"uint256","name":"vac1_","type":"uint256"},{"internalType":"uint256","name":"vac2_","type":"uint256"},{"internalType":"uint256","name":"reqDate_","type":"uint256"},{"internalType":"string","name":"HAname_","type":"string"},{"internalType":"string","name":"HAadd_","type":"string"}],"name":"hareq","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"retHAreq","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]' );
  
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

  function registerVaccineInfo(){
    _add = $("#haadd").val();
    vacc1 = $("#vac1").val();
    vacc2 = $("#vac2").val();
    vac1 = $("#novac1").val();
    vac2 = $("#novac2").val();
    reqDate = $("#date").val();
    HAname = $("#haname").val();
    HAadd = $("#addressha").val();
    contract.methods.hareq (_add,vacc1,vacc2,vac1,vac2,reqDate,HAname,HAadd).send( {from: account}).then( function(tx) { 
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