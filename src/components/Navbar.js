import React, { Component } from 'react'
import { render } from 'react-dom';
import { Row, Col, Nav, NavItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  navItem(to, text) {
    if (this.isAuthenticated()) {
      let itemClassName = 'app-nav__item';
      if (this.props.location.pathname.toString().match(to.toString())) {
        itemClassName += ' active';
      }
      return <Link to={to} className={itemClassName}>{text}</Link>;
    }
  }

  isOwner() {
    return localStorage.getItem('userKind') === 'owner';
  }

  signOut() {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('userKind', null);
    this.props.history.push('/');
  }

  signOutBtn() {
    if (this.isAuthenticated()) {
      return <a className="app-nav__item pull-right" onClick={this.signOut}>Sign out</a>
    }
  }

  render() {
    return (
      <div className="app-nav">
        <div className="container-fluid">
          <a href="/" className="app-nav__logo-link">
            <img className="app-nav__logo" src="/images/logo-white.png" />
          </a>
          { this.isOwner() ? this.navItem('/pros', 'Pros') : null }
          { this.navItem('/clients', 'Clients')}
          { this.navItem('/graphs', 'Analytics')}
          { this.signOutBtn() }
          <div className="clearfix" />
        </div>
      </div>
   )
  }
}

export default withRouter(Navbar);

