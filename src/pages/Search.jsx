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
    // searchResultName: false,
    hasResults: true,
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
    // this.setState({
    //   imputBandName: bandName,
    // });
    await searchAlbumsAPI(bandName).then(
      (albuns) => {
        this.setState({
          albuns,
          bandName: '',
          // searchResultName: true,
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
      albuns,
      // imputBandName,
      hasResults,
      // searchResultName,
      loading,
    } = this.state;

    return loading ? <Loading /> : (
      <div data-testid="page-search">
        <Header />
        <section className="section-search">
          <form className="form-search">
            <h3>BUSCAR BANDA</h3>
            <input
              type="text"
              data-testid="search-artist-input"
              className="search-artist-input"
              placeholder="Digite o nome da banda"
              onChange={ this.handleChangeBandName }
              value={ bandName }
              loading={ loading }
            />
            <button
              className="button"
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
              onClick={ this.handleClickSearchAlbum }
              loading={ loading }
            >
              Pesquisar
            </button>
          </form>
          <section className="search-album">
            {/* {searchResultName && (<h5>{`Resultado de álbuns de: ${imputBandName}`}</h5>)} */}
            {hasResults
              ? (
                albuns.map((a) => (<CardAlbuns key={ a.collectionName } album={ a } />)))
              : 'Nenhum álbum foi encontrado'}
          </section>
        </section>

      </div>
    );
  }
}
