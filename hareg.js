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
  var contractAddress = '0xF27223763f3026d027294a9273A6E2604275f612';
  var abi = JSON.parse( '[{"constant":true,"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"HA_details","outputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"ha_add","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_HAaddress","type":"string"}],"name":"HA_registration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );
  
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
  function registerSetInfo() {
    _add = $("#haaddress").val();
    name = $("#haname").val();
    HAaddress = $("#addressha").val();
    contract.methods.HA_registration (_add,name,HAaddress).send( {from: account}).then( function(tx) { 
      console.log("Transaction: ", tx); 
    });
  }
  
  function registerGetInfo() {
    contract.methods.HA_details(_add).call().then( function(name_, ha_add) {
      document.getElementById('lastname').innerHTML = JSON.stringify(name_[0]);
      document.getElementById('lastaddress').innerHTML = JSON.stringify(HAaddress);
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