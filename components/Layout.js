import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header'; // place html nested in tag to inject into page header

export default (props) => { // functional components called with props argument
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
        />
      </Head>

      <Header />
      {props.children}
    </Container>
  );
};
