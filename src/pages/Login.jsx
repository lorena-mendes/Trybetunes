import React, { Component } from 'react';
import LoginForm from '../Components/LoginForm';
// import PropTypes from 'prop-types';

const minimumCharacter = 3;

export default class Login extends Component {
  state = {
    userName: '',
    buttonDisabled: true,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    const { userName } = this.setState;
    if (userName.length >= minimumCharacter) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const { buttonDisabled } = this.setState;

    return (
      <section>
        <div data-testid="page-login">
          <LoginForm
            buttonDisabled={ buttonDisabled }
            handleChange={ this.handleChange }
          />
        </div>
      </section>
    );
  }
}
