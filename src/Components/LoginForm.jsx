import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
  render() {
    const { buttonDisabled } = this.props;
    return (
      <section>
        <form>
          <h2>Login</h2>
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Digite seu nome"
            name="userName"
            className="login-name-input"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            className="btn-login"
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

LoginForm.propTypes = {
  handleChange: PropTypes.func,
  buttonDisabled: PropTypes.bool,
}.isRequired;
