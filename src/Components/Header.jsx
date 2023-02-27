/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../Css/header.css';

export default class Header extends Component {
  state = {
    userName: '',
    loading: false,
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
      <div data-testid="header-component">
        <section className="section-header">
          <header className="header-user-name">
            <h2 data-testid="header-user-name">{userName}</h2>
            <li><Link to="/search" data-testid="link-to-search">Pesquisar</Link></li>
            <li><Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link></li>
            <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
          </header>
        </section>
      </div>
    );
  }
}
