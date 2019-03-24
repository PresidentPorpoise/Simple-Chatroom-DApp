import React, { Component } from 'react';
import { Link } from '../routes';
import { Icon } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return(
      <footer>
        <div id='footer'>
          <div id='footer-content'>
            <p>Developed by Bryce Champaign<br/>
            <Link href='https://www.brycechampaign.me'>
            <a>www.brycechampaign.me</a></Link></p>
          </div>

          <div>
            <Link href='https://github.com/PresidentPorpoise'>
              <a id='iconLink'>
                <Icon name='github' size='big' link />
              </a>
            </Link>

            <Link href='https://twitter.com/Bryce57537732'>
              <a id='iconLink'>
                <Icon name='twitter' size='big' link />
              </a>
            </Link>

            <Link href='https://www.linkedin.com/in/bryce-champaign/'>
              <a id='iconLink'>
                <Icon name='linkedin' size='big' link />
              </a>
            </Link>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
