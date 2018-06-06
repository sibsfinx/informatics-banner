import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, withRouter, Switch, Redirect, Link, IndexRoute } from 'react-router-dom';
import ClientsList from './ClientsList';
import ClientView from './ClientView';
import ProsList from './ProsList';
import ProView from './ProView';
import Home from './Home';
import Graphs from './Graphs';
import SignIn from './SignIn';
import { default as clientsData } from '../data/clients';
import { default as prosData } from '../data/pros';

class Main extends Component {
  constructor(props) {
    super(props);
    this.checkAuth = this.checkAuth.bind(this);
    this.authContent = this.authContent.bind(this);
    this.publicContent = this.publicContent.bind(this);
  }

  checkAuth() {
    return (localStorage.getItem('isAuthenticated') === 'true');
  }

  rootRedirect() {
    let redirectPath = localStorage.getItem('userKind') === 'owner' ? '/pros' : 'clients';
    return <Redirect from="/" exact to={redirectPath} />
  }

  authContent() {
    return (
      <Switch>
        <Route exact path="/clients" render={(props) => (
          <div className="app-content__block-wide">
            <ClientsList {...props} clients={clientsData} />
          </div>
        )}/>
        <Route path={`/clients/:clientId`} render={(props) => (
          <div className="app-content__block-wide">
            <ClientView {...props} clients={clientsData} />
          </div>
        )}/>
        <Route exact path='/graphs' component={Graphs}/>
        <Route exact path="/pros" render={(props) => (
          <div className="app-content__block-wide">
            <ProsList {...props} pros={prosData} />
          </div>
        )}/>
        <Route path={`/pros/:proId`} render={(props) => (
          <div className="app-content__block-wide">
            <ProView {...props} pros={prosData} />
          </div>
          )}/>
        {this.rootRedirect()}
      </Switch>
    )
  }

  publicContent() {
    return (
      <Switch>
        <Route exact path='/sign-in' component={SignIn} />
        <Redirect from="/" exact to="/sign-in" />
      </Switch>
    )
  }

  render() {
    return (
      <div className="app-content">
        {this.checkAuth() ? this.authContent() : this.publicContent() }
      </div>
    )
  }
}

// <Redirect from="/" exact to="/clients" />

export default withRouter(Main);


