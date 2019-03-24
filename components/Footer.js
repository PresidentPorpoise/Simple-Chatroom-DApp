import React, { Component } from 'react';
import { Link } from '../routes';
import { Icon } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return(
      <footer>
        <div id='footer'>
          <div style={{ paddingTop: '0.5em' }}>
            <p>Developed by Bryce Champaign<br/>
            <Link href='https://www.brycechampaign.me'>
            <a>www.brycechampaign.me</a></Link></p>
          </div>
          <Link href='https://github.com/PresidentPorpoise/Simple-Chatroom-DApp'>
          <a id='iconLink'><Icon name='github' floated='right' size='large' link />
          </a></Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
