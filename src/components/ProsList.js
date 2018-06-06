import React, { Component } from 'react'
import { render } from 'react-dom';
import { Row, Col } from 'react-bootstrap';
import ProsListItem from './ProsListItem';

class ProsList extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="content-block">Pros</h1>
        <div className="clients-list">
          { this.props.pros.map(( c, i) => {
            return (
              <ProsListItem data={c} />
            );
          })}
        </div>
      </div>
    )
  }
}

export default ProsList;
