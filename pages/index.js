import React, { Component } from 'react';
import { Card, Button, Container, Divider, Label, List, Icon, Form, Grid } from 'semantic-ui-react';
import chatroom from '../ethereum/chatroom';
import web3 from '../ethereum/web3';
import Layout from '../components/Layout';

class Index extends Component {
  state= {
    messageContent: '',
    usernameContent: ''
  };

  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
    const chatLength = await chatroom.methods.getMessagesLength().call({
      from: accounts[0]
    });

    var chatLog = [];
    var authors = [];
    var usernames = [];

    //var sendEvent = chatroom.SendMessage();

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

  onSend = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await chatroom.methods.sendMessage(this.state.messageContent).send({
      from: accounts[0]
    });
  }

  onChange = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await chatroom.methods.setUsername(this.state.usernameContent).send({
      from: accounts[0]
    });
  }

  getAuthors(index) {
    return this.props.authors[index];
  }

  getUsernames(index) {
    return this.props.usernames[index];
  }

  renderChat() {
    let message;
    let author;
    let username;
    let items = []

    for (var i = 0; i < this.props.chatLog.length; i++) {
      message = this.props.chatLog[i];
      author = this.getAuthors(i);
      username = this.getUsernames(i);

      if (username == "") {
        items.push
          (<List.Item>
            <List.Content>
              <List.Header as='a'>{author}</List.Header>
              <List.Description>
                {message} <Divider/>
              </List.Description>
            </List.Content>
          </List.Item>)
      } else {
        items.push
          (<List.Item>
            <List.Content>
              <List.Header as='a'>{username}</List.Header>
              <List.Description>
                {message} <Divider/>
              </List.Description>
            </List.Content>
          </List.Item>)
      }
    }

    return items;
  }

  render() {
    return(
      <Layout>
        <div>
          <Container>
            <Grid padded stackable>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Container>
                    <List>
                      {this.renderChat()}
                    </List>
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form onSubmit={this.onSend}>
                    <Form.Field>
                      <label>Send a Message</label>
                      <Form.Input required
                        placeholder="Enter a message..."
                        value={this.state.messageContent}
                        onChange={event => this.setState({ messageContent: event.target.value})}
                      />
                    </Form.Field>

                    <Button
                      content='Send'
                      icon='send'
                      primary
                    />
                  </Form>
                </Grid.Column>

                <Grid.Column>
                  <Form onSubmit={this.onChange}>
                    <Form.Field>
                      <label>Change Username</label>
                      <Form.Input required
                        placeholder="Enter a new username..."
                        value={this.state.usernameContent}
                        onChange={event => this.setState({ usernameContent: event.target.value})}
                      />
                    </Form.Field>

                    <Button
                      content='Change'
                      icon='pencil'
                    />
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default Index;
