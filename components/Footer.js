import React, { Component } from 'react';
import { Link } from '../routes';

class Footer extends Component {
  render() {
    return(
      <footer>
        <div id='footer'>
          <p>Developed by Bryce Champaign<br/><Link href='https://www.brycechampaign.me'><a>www.brycechampaign.me</a></Link></p>
        </div>
      </footer>
    );
  }
}

export default Footer;
