import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
//import checkCredentials from '../checkCredentials';

const BaseComponent = () => {
  class Restricted extends Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }

    checkAuthentication(params) {
      const { history } = params;
      debugger;
      // checkCredentials()
      //     .catch(e => history.replace({ pathname: '/login' }));
      if (localStorage.getItem('isAuthenticated' !== 'true')) {
        history.replace({pathname: '/sign-in'});
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return withRouter(Restricted);
}

export default BaseComponent;
