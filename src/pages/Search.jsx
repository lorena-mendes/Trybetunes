import React, { Component } from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const minimumCharacter = 2;

export default class Search extends Component {
  state = {
    bandName: '',
    buttonDisabled: true,
    albuns: [],
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

  handleClick = () => {
    const { bandName } = this.state;
    this.setState({ bandName: '' });
    searchAlbumsAPI(bandName).then(
      (albuns) => {
        this.setState({
          albuns,
        });
      },
    );
  }

  render() {
    const { buttonDisabled, bandName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Digite o nome da banda"
            onChange={ this.handleChangeBandName }
            value={ bandName }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
