import React, { Component } from 'react';
import Loading from '../Components/Loading';

export default class NotFound extends Component {
  state = {
    loading: false,
  }

  render() {
    const { loading } = this.state;
    return loading ? <Loading /> : (
      <div data-testid="page-not-found">
        Not Found
      </div>
    );
  }
}
