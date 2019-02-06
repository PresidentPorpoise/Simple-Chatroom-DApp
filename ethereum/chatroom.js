import web3 from './web3';
import Chatroom from "./build/Chatroom.json";

const instance = new web3.eth.Contract(
  Chatroom['Chatroom']['Chatroom'].abi,
  '0xFab90BFaf51Afb398f6fF8bAC56AcCef0A4ef773'
);

export default instance;
