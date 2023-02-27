import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

export default class Profile extends Component {
  state = {
    loading: false,
  }

  render() {
    const { loading } = this.state;
    return loading ? <Loading /> : (
      <div data-testid="page-profile">
        <Header />
      </div>
    );
  }
}
