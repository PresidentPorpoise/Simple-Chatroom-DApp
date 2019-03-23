import React from 'react';
import { Menu, Icon, Input, Button } from 'semantic-ui-react';

export default () => {
  return (
    <Menu style={{ marginTop: '10px'}} size='medium' secondary>
      <Menu.Item>
        <Icon name='home' />
        Chatroom
      </Menu.Item>

      <Menu.Item position="right">
        <Icon name='github' />
        Code
      </Menu.Item>

      <Menu.Item>
        <Icon name='question circle' />
        About
      </Menu.Item>
    </Menu>
  )
}
