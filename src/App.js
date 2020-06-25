import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Panel from './Panel.js';
import dog from './images/dog.jpg';
import { Container } from '@material-ui/core';

const examplejson = {
  image: dog,
  title: 'Dog',
  subtitle: 'Jan 2020',
  body: 'Dogs are cool. I really want one',
  links: [
    {
      name: 'Google',
      href: 'https://www.google.com'
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com'
    }
  ]
}

export default class App extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Panel json={examplejson}/>
      </Container>
    );
  }
}
