import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Container, Divider, Segment, Button, Card, Icon } from 'semantic-ui-react';
import { Link } from '../routes.js';

class About extends Component {
  render() {
    return(
      <Layout>
        <div className='banner' id="miniBanner">
          <h1>About</h1>
        </div>
        <Container id='about-body'>
          <h2>Why/What?</h2>

          <p>This decentralized application was developed for learning purposes. It uses the
            Ethereum network to store message and username data and display it to users.
            The front-end you are seeing now allows users to send transactions
            containing message and username data to the chatroom smart contract. The front-end
            then retrieves the data from the smart contract, which acts as a back-end,
             and displays it to users. Users require Metamask or some other method
            of connecting to the Ethereum network in order to use this application.
          </p>

            <Divider />

            <h2>Packages Used:</h2>
            <h3>Front-end</h3>
            <p>React, Next.js, Semantic UI React, Webpack.</p>
            <h3>Back-end/Testing</h3>
            <p>Web3, Solidty Compiler (solc), Mocha, Ganache CLI, Truffle HDWallet Provider</p>

            <Divider />

            <h2>Links:</h2>
            <Link href='https://github.com/PresidentPorpoise/Simple-Chatroom-DApp'>
              <a>
                <Button size='large'>
                  <Icon name='github' />
                    Github Repository
                  </Button>
                </a>
            </Link>

            <Link href='https://www.brycechampaign.me'>
              <a>
                <Button size='large'>
                  <Icon name='book' />
                    My Portfolio
                  </Button>
                </a>
            </Link>


            <Divider />

            <h2>Like what you see? Send me a tip!</h2>
            <Card.Group stackable>
              <Card className='card-text'>
                <Card.Content>
                  <Card.Header>Ethereum</Card.Header>
                  <Card.Meta>Address</Card.Meta>
                  <Card.Description content='0x8B2b2520fc14b8a625D40ee3CBccAa2061b53504' />
                </Card.Content>
              </Card>

              <Card className='card-text'>
                <Card.Content>
                  <Card.Header>Nano</Card.Header>
                  <Card.Meta>Address</Card.Meta>
                  <Card.Description content='xrb_13qi6a6hjz53a1cp6yejpj9rbdr5ze9hrcpa8jxbf9otb56mxonmw84crgbz' />
                </Card.Content>
              </Card>

              <Card className='card-text'>
                <Card.Content>
                  <Card.Header>Bitcoin (BCH)</Card.Header>
                  <Card.Meta>Address</Card.Meta>
                  <Card.Description content='0x8B2b2520fc14b8a625D40ee3CBccAa2061b53504' />
                </Card.Content>
              </Card>
            </Card.Group>
        </Container>
      </Layout>
    );
  }
}

export default About;
