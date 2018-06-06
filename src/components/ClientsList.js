import React, { Component } from 'react'
import { render } from 'react-dom';
import { Row, Col } from 'react-bootstrap';
//import clients from './src/data/clients';
import ClientsListItem from './ClientsListItem';

class ClientsList extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="content-block">Clients</h1>
        <div className="clients-list">
          { this.props.clients.map(( c, i) => {
            return (
              <ClientsListItem data={c} />
            );
          })}
        </div>
      </div>
    )
  }
}

export default ClientsList;
