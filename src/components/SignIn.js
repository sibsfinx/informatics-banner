import React, { Component } from 'react'
import { render } from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      formType: 'owner'
    };
  }

  componentWillMount() {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      this.props.history.push('/');
    }
  }

  handleSubmit(e) {
    e.preventDefault(e);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userKind', this.state.formType);
    this.props.history.push('/');
  }

  changeFormType(userKind) {
    this.setState({ formType: userKind });
  }

  ownerInputHtml() {
    if (this.state.formType === 'owner') {
      return (
        <div className="form-group">
          <input className="form-control" placeholder="Company" type="text" />
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={6} mdOffset={3}>
            <h2 className="content-block">Sign In</h2>
            <div className="content-block">
              <ButtonGroup>
                <Button onClick={() => this.changeFormType('owner')} active={ this.state.formType === 'owner' }>Owner</Button>
                <Button onClick={() => this.changeFormType('pro')} active={ this.state.formType === 'pro'} >Pro</Button>
              </ButtonGroup>
            </div>
            <form className="form-vertical" onSubmit={this.handleSubmit}>
              { this.ownerInputHtml() }
              <div className="form-group">
                <input className="form-control" placeholder="Your email" type="email" />
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Password" type="password" />
              </div>
              <button type="submit" className="btn btn-lg btn-primary">Sign in</button>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SignIn;
//export default withRouter(SignIn);
