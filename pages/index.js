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

    for (let i = 0; i < chatLength; i++) {
      let message = await chatroom.methods.getMessage(i).call({
        from: accounts[0]
      });

      chatLog.push(message);
    }

    for (let i = 0; i < chatLength; i++) {
      let author = await chatroom.methods.getAuthor(i).call({
        from: accounts[0]
      });

      authors.push(author);
    }
    console.log(authors);
    return { chatLog, authors }
  }

  getAuthors(i) {
    return this.props.authors[i];
  }

  renderChat() {
    const items = this.props.chatLog.map(string => {
      return {
        header: string,
        description: this.getAuthors(this.props.chatLog.indexOf(string)),
        fluid: true
      };
    });

    return <Feed.Summary items={items}/>
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
            <Feed>
              <Feed.Content>
                {this.renderChat()}
              </Feed.Content>          
            </Feed>
          </Card.Content>
        </Card>


      </div>
    );
  }
}

export default Index;
