import React, { Component } from 'react'
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Link, IndexRoute } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Main from './Main';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
  )}
}

export default App;


