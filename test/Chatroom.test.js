const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let chatroom;
let accounts;

beforeEach (async () => {
  accounts = await web3.eth.getAccounts();

  chatroom = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode})
    .send({ from: accounts[0], gas: 6700000 });
});

describe('Chatroom Contract', () => {
  it('deploys a contract', () => {
    assert.ok(chatroom.options.address);
  });

  it('enters the host', async() => {
    const members = await chatroom.methods.getMembers().call({
      from: accounts[0]
    });

    const checkMember = await chatroom.methods.checkMember(accounts[0]).call({
      from: accounts[0]
    });

    assert.equal(accounts[0], members[0]);
    assert.equal(1, members.length);
    assert.equal(true, checkMember);
  });

  it('enters the sender', async () => {
    await chatroom.methods.sendMessage("test").send({
      from: accounts[1],
      gas: 1000000
    });

    const checkMember = await chatroom.methods.checkMember(accounts[1]).call({
      from: accounts[0]
    });

    assert.equal(true, checkMember);
  });

  it('enters multiple senders', async () =>{
    await chatroom.methods.sendMessage("test").send({
      from: accounts[1],
      gas: 1000000
    });

    await chatroom.methods.sendMessage("test").send({
      from: accounts[2],
      gas: 1000000
    });

    const members = await chatroom.methods.getMembers().call({
      from: accounts[0]
    });

    const senders = [accounts[0], accounts[1], accounts[2]];

    assert.equal(members.members, senders.members);
  });

  it('lets host transfer role to another member', async() => {
    await chatroom.methods.sendMessage("test").send({
      from: accounts[1],
      gas: 1000000
    });

    await chatroom.methods.switchHost(accounts[1]).send({
      from: accounts[0]
    });

    const host = await chatroom.methods.host().call({
      from: accounts[0]
    });

    assert.equal(accounts[1], host);
  });

  it('only lets host transfer role to another member', async() => {
    await chatroom.methods.sendMessage("test").send({
      from: accounts[1],
      gas: 1000000
    });

    try {
      await chatroom.methods.switchHost(accounts[1]).send({
        from: accounts[1]
      });
      throw(false);
    } catch (err) {
      assert(err);
    }
  });

  it('sends a message', async() => {
    await chatroom.methods.sendMessage("test").send({
      from: accounts[0],
      gas: '6700000'
    });

    const getMessage = await chatroom.methods.getMessage(0).call({
      from: accounts[0]
    });

    assert.equal('test', getMessage);
  });

  it('does not enter account twice', async () => {
    await chatroom.methods.sendMessage("test").send({
      from: accounts[0],
      gas: 1000000
    });

    const members = await chatroom.methods.getMembers().call({
      from: accounts[0]
    });

    assert.equal(1, members.length);
  });

  it('sets usernames', async() => {
    await chatroom.methods.setUsername("testUsername").send({
      from: accounts[0]
    });

    const actualUsername = await chatroom.methods.getUsername(accounts[0]).call({
      from: accounts[0]
    });

    assert.equal("testUsername", actualUsername);
  });

  it('gets the author', async() => {
    await chatroom.methods.sendMessage("test").send({
      from: accounts[0],
      gas: 1000000
    });

    const author = await chatroom.methods.getAuthor(0).call({
      from: accounts[0]
    });

    assert.equal(accounts[0], author);
  });

  it('gives host a default username', async() => {
    username = await chatroom.methods.getUsername(accounts[0]).call({
      from: accounts[0]
    });

    assert.equal("host", username);
  });
});
