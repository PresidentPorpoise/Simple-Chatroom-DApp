import React, { Component } from 'react';
import { Card, Button, Feed } from 'semantic-ui-react';
import chatroom from '../ethereum/chatroom.js';
import web3 from '../ethereum/web3.js';
import Head from 'next/head';

class Index extends Component {
  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
    const chatLength = await chatroom.methods.getMessagesLength().call({
      from: accounts[0]
    });

    var chatLog = [];
    var authors = [];
    var usernames = [];

    for (let i = 0; i < chatLength; i++) {
      let message = await chatroom.methods.getMessage(i).call({
        from: accounts[0]
      });

      let author = await chatroom.methods.getAuthor(i).call({
        from: accounts[0]
      });

      let username = await chatroom.methods.getUsername(author).call({
        from: accounts[0]
      });

      chatLog.push(message);
      authors.push(author);
      usernames.push(username);
    }

    for (let i = 0; i < chatLength; i++) {
      let author = await chatroom.methods.getAuthor(i).call({
        from: accounts[0]
      });

      authors.push(author);
    }
    console.log(authors);
    return { chatLog, authors, usernames }
  }

  getAuthors(index) {
    return this.props.authors[index];
  }

  getUsernames(index) {
    return this.props.usernames[index];
  }

  renderChat() {
    const items = this.props.chatLog.map(string => {
      var username = this.getUsernames(this.props.chatLog.indexOf(string));

      if (username == "") {
        return {
          header: string,
          description: this.getAuthors(this.props.chatLog.indexOf(string)),
          fluid: true
        };
      } else {
        return {
          header: string,
          description: username,
          fluid: true
        };
      }
    });

    return <Card.Group items={items}/>
    console.log(items);
  }


  render() {
    return(
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>

        <h1>Chatroom Application</h1>

        <Card fluid>
          <Card.Content>
            <Card.Header>Chatroom</Card.Header>
          </Card.Content>
          <Card.Content>
              {this.renderChat()}
          </Card.Content>
        </Card>


      </div>
    );
  }
}

export default Index;
