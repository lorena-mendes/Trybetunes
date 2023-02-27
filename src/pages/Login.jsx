import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';
import '../Css/login.css';

const minimumCharacter = 3;

export default class Login extends Component {
  state = {
    userName: '',
    buttonDisabled: true,
    loading: false,
  };

  changeRoute = () => {
    const { history } = this.props;
    history.push('/search');
  }

  handleClickLogin = () => {
    const { userName } = this.state;
    createUser({ name: userName }).then(
      () => {
        this.changeRoute();
      },
    );
    this.setState({ loading: true });
  }

  handleChangeUserName = (event) => {
    this.setState({
      userName: event.target.value,
    }, () => {
      const { userName } = this.state;
      if (userName.length >= minimumCharacter) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  }

  render() {
    const { buttonDisabled, userName, loading } = this.state;

    return loading ? <Loading /> : (
      <div data-testid="page-login">
        <section className="section-login">
          <form className="form-login">
            <h1>LOGIN</h1>
            <input
              type="text"
              data-testid="login-name-input"
              placeholder="Digite seu nome"
              name="userName"
              className="login-name-input"
              onChange={ this.handleChangeUserName }
              value={ userName }
            />
            <button
              className="button"
              type="button"
              data-testid="login-submit-button"
              disabled={ buttonDisabled }
              onClick={ this.handleClickLogin }
              handleClick={ this.handleClickLogin }
            >
              Entrar
            </button>
          </form>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string,
  loading: PropTypes.bool,
}.isRequired;
