import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';
// import Loading from '../Components/Loading';

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

  handleClick = () => {
    const { userName } = this.state;
    this.setState({ loading: true });
    createUser({ name: userName }).then(
      () => {
        this.changeRoute();
      },
    );
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
      <section data-testid="page-login">
        <form>
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
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
            handleClick={ this.handleClick }
            loading={ loading }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string,
  loading: PropTypes.bool,
}.isRequired;
