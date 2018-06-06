import React, { Component } from 'react'
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Nav, NavItem } from 'react-bootstrap';
import _ from 'lodash';

const waGroups = [
  {
    name: 'Nutrition One',
    url: 'https://chat.whatsapp.com/5fW5iMbMgN56iDuoahzhnv'
  },
  {
    name: 'Fitness One',
    url: 'https://chat.whatsapp.com/5fW5iMbMgN56iDuoahzhnv'
  }
];

class ProView extends Component {
  constructor(props) {
    super(props);
    this.detailsHmtl = this.detailsHmtl.bind(this);
    this.chatsHtml = this.chatsHtml.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeTab: 'details'
    };
  }

  getPro() {
    let pro = _.find(this.props.pros, {id: this.props.match.params.proId});
    return pro;
  }

  detailsHmtl() {
    return (
      <div>
        <h3 className="content-block">
          Profile
        </h3>
        <div className="attributes_table user" id="attributes_table_user_176">
          <table className="table" border="0" cellspacing="0" cellpadding="0">
            <tbody><tr className="row row-email">
              <th>Email</th>
              <td>{this.getPro().email}</td>
            </tr>
            <tr className="row row-first_name">
              <th>Name</th>
              <td>{this.getPro().name}</td>
            </tr>
            <tr className="row row-phone">
              <th>Phone</th>
              <td>07972172379</td>
            </tr>
          </tbody></table>
        </div>
      </div>
    )
  }

  chatsHtml() {
    return (
       <div className="content-block">
        <h3>Whatsapp groups</h3>
        { waGroups.map((g, i) => {
          return (
            <p>
              <a href={g.url} target="_blank">
                {g.name}
              </a>
            </p>
          )
        }) }
      </div>
    )
  }

  handleSelect(key) {
    this.setState({activeTab: key});
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="content-block">
            <Link to="/pros" className="btn btn-default">
              &lt; Back
            </Link>
          </div>
          <div className="client-view">
            <h1 className="content-block">
              {this.getPro().name}
            </h1>
            <Nav bsStyle="tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
              <NavItem eventKey={'details'}>Details</NavItem>
              <NavItem eventKey={'chats'}>Chats</NavItem>
              <NavItem eventKey={'analytics'}>Analytics</NavItem>
              <NavItem eventKey={'activity'}>Activity</NavItem>
            </Nav>
            { this.state.activeTab === 'details' ? this.detailsHmtl() : null }
            { this.state.activeTab === 'chats' ? this.chatsHtml() : null }
          </div>
        </div>
      </div>
    )
  }
}


export default ProView;
