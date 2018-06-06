import React, { Component } from 'react'
import { render } from 'react-dom';

class AppError extends Component {

  render() {
    return (
      <div>
        <div className="app-spinner-block text-center" style={{width: 200 + 'px', marginLeft: -120 + 'px'}}>
          <h1>😿</h1>
          <p>Sorry, something went wrong — but we're fixing it!</p>
        </div>
      </div>
    )
  }
}

export default AppError;
