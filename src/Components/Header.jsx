import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    userName: '',
    loading: true,
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      userName: user.name,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return loading ? <Loading /> : (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ userName }</p>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <br />
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
