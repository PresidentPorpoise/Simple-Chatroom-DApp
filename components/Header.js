import React, { Component } from 'react';
import { Menu, Icon, Input, Button, Responsive, Dropdown } from 'semantic-ui-react';
import { Link } from '../routes.js';
import Head from 'next/head';
import '../components/styles.css';

class Header extends Component {
  state = { visible: false }

  render() {
    return (
      <div>
        <Head>
          <title>Chatroom DApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
        </Head>
          <Responsive minWidth={800}>
            <Menu secondary className="navbar-items">
              <Menu.Item header>
                <Link href='/'><a>Chatroom DApp</a></Link>
              </Menu.Item>

              <Menu.Item  position="right" href='/about'>
                About
              </Menu.Item>
              <Menu.Item href='/about'>
                Github
              </Menu.Item>
            </Menu>
          </Responsive>

          <Responsive maxWidth={799}>
            <Menu secondary className="navbar-items">
              <Menu.Item header>
                <Link href='/'><a>Chatroom</a></Link>
              </Menu.Item>

              <Menu.Item  position="right">
                <Dropdown icon='bars' direction='left'>
                  <Dropdown.Menu>
                    <Dropdown.Item  href='/about' text='About' />
                    <Dropdown.Item  href='/' text='Github' />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu>
          </Responsive>
        </div>
    )
  }
}

export default Header;
