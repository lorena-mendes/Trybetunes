import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbuns from '../Components/CardAlbuns';
import '../Css/search.css';

const minimumCharacter = 2;

export default class Search extends Component {
  state = {
    bandName: '',
    buttonDisabled: true,
    albuns: [],
    loading: false,
    searchResultName: false,
    hasResults: true,
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
      imputBandName: bandName,
      loading: true,
    });
    await searchAlbumsAPI(bandName).then(
      (albuns) => {
        this.setState({
          albuns,
          loading: false,
          bandName: '',
          searchResultName: true,
        }, () => {
          if (albuns.length === 0) {
            this.setState({ hasResults: false });
          } else {
            this.setState({ hasResults: true });
          }
        });
      },
    );
  }

  render() {
    const {
      buttonDisabled,
      bandName,
      loading,
      albuns,
      imputBandName,
      hasResults,
      searchResultName,
    } = this.state;

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
        {searchResultName && (<h2>{`Resultado de álbuns de: ${imputBandName}`}</h2>)}
        {hasResults
          ? (
            albuns.map((a) => (<CardAlbuns key={ a.collectionName } album={ a } />)))
          : 'Nenhum álbum foi encontrado'}
      </div>
    );
  }
}
