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
  var contractAddress = '0x21dE8bd3257B4148b0D22c5B8EF61da08155Aa75';
  var abi = JSON.parse( '[{"constant":true,"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"VMC_details","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_type","type":"string"},{"internalType":"string","name":"_VMCaddress","type":"string"}],"name":"VMC_registration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );
  
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
    _add = $("#vmcaddress").val();
    typeVaccine = $("#typeofvaccine").val();
    name = $("#vmcname").val();
    VMCaddress = $("#addressvmc").val();
    contract.methods.VMC_registration (name,typeVaccine,VMCaddress,_add).send( {from: account}).then( function(tx) { 
      console.log("Transaction: ", tx); 
    });
  }
  
  function registerGetInfo() {
    contract.methods.VMC_details(_add).call().then( function(name,typeVaccine,VMCaddress) { 
      console.log("name: ", name);
      console.log("HAadress: ", typeVaccine);
      console.log("HAadress: ", VMCaddress);
      document.getElementById('lastname').innerHTML = name;
      document.getElementById('lasttypeofvaccine').innerHTML = typeVaccine;
      document.getElementById('lastaddress').innerHTML = VMCaddress;   
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