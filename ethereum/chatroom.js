import web3 from './web3';
import Chatroom from "./build/Chatroom.json";

const instance = new web3.eth.Contract(
  Chatroom['Chatroom']['Chatroom'].abi,
  '0x961AD567C75F63d368458e5cA8059307B923D8F8'
);

export default instance;
