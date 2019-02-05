const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledChatroom = require('./build/Chatroom.json');
const chatroomOutput = compiledChatroom['Chatroom']['Chatroom'];

const provider = new HDWalletProvider(
  'govern ask ritual try barely acoustic steel void share tobacco caution gown',
  'https://rinkeby.infura.io/v3/68231853f39c4e27bdcd83c2d6ca0a94'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  console.log(chatroomOutput.evm.bytecode);

  const result = await new web3.eth.Contract(chatroomOutput.abi)
      .deploy({ data: '0x' + chatroomOutput.evm.bytecode.object })
      .send({ from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
