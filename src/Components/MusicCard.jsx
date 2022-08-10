import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    favoriteMusic: false,
    loading: false,
  }

  componentDidMount = async () => {
    const favorites = await getFavoriteSongs();
    const { music } = this.props;
    this.setState(
      { favoriteMusic: favorites.some((el) => music.trackId === el.trackId) },
    );
  }

  handleFavorite = async (music) => {
    const { favoriteMusic } = this.state;
    if (favoriteMusic) {
      this.setState({
        favoriteMusic: false,
        loading: true,
      });
      await removeSong(music);
    } else {
      this.setState({
        favoriteMusic: true,
        loading: true,
      });
      await addSong(music);
    }
    this.setState({ loading: false });
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, favoriteMusic } = this.state;

    return loading ? <Loading /> : (
      <div>
        <section key={ trackName }>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor={ `favorite-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              checked={ favoriteMusic }
              onChange={ () => this.handleFavorite(music) }
              id={ `favorite-${trackId}` }
              type="checkbox"
            />
          </label>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
