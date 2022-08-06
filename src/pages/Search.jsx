import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbuns from '../Components/CardAlbuns';

const minimumCharacter = 2;

export default class Search extends Component {
  state = {
    bandName: '',
    buttonDisabled: true,
    albuns: [],
    loading: false,
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

  handleClickSearchAlbum = async () => {
    const { bandName } = this.state;
    this.setState({
      bandName: '',
      loading: true,
    });
    await searchAlbumsAPI(bandName).then(
      (albuns) => {
        this.setState({
          albuns,
          loading: false,
        });
      },
    );
  }

  render() {
    const { buttonDisabled, bandName, loading, albuns } = this.state;

    return loading ? <Loading /> : (
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
            onClick={ this.handleClickSearchAlbum }
          >
            Pesquisar
          </button>
        </form>
        {albuns.map((album) => (<CardAlbuns
          key={ album.collectionName }
          album={ album }
        />))}
      </div>
    );
  }
}
