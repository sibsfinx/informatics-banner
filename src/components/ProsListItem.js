import React, { Component } from 'react'
import { render } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';

class ProsListItem extends Component {
  getClassName() {
    let itemClassName = 'clients-list__item-link';
    let paramsId = this.props.location.pathname.split('/')[2];
    if (paramsId && (paramsId.toString() === this.props.data.id.toString())) {
      itemClassName += ' active';
    }
    return itemClassName;
  }

  render() {
    return (
      <div>
        <div className="clients-list__item">
          <Link to={`/pros/${this.props.data.id}`} className={this.getClassName()}>
            {this.props.data.name}
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(ProsListItem);
