import React, { Component } from 'react';
import Header from '../Components/Header';

const minimumCharacter = 2;

export default class Search extends Component {
  state = {
    bandName: '',
    buttonDisabled: true,
  };

  handleChangeBandName = (event) => {
    this.setState({
      bandName: event.target.value,
    }, () => {
      const { bandName } = this.state;
      if (bandName.length >= minimumCharacter) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Digite o nome da banda"
            onChange={ this.handleChangeBandName }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
