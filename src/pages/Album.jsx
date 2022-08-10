import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

export default class Album extends Component {
  state = {
    albumName: '',
    artistName: '',
    albumImage: '',
    allMusicsAlbum: [],
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const allMusics = await getMusics(id);
    const musics = allMusics.filter((music) => music.kind);
    const albumCollection = allMusics.find((album) => album);
    this.setState({
      albumName: albumCollection.collectionName,
      albumImage: albumCollection.artworkUrl100,
      artistName: albumCollection.artistName,
      allMusicsAlbum: musics,
    });
    this.setState({ loading: false });
  }

  render() {
    const {
      allMusicsAlbum,
      albumName,
      artistName,
      albumImage,
      loading,
    } = this.state;

    return loading ? <Loading /> : (
      <div>
        <Header />
        <div data-testid="page-album">
          <h1 data-testid="artist-name">{artistName}</h1>
        </div>
        <img src={ albumImage } alt={ albumName } />
        <div>
          <h3 data-testid="album-name">{albumName}</h3>
        </div>
        {
          allMusicsAlbum.map((music) => (
            <div key={ music.trackId }>
              <h2>{music.trackName}</h2>
              {/* <img src={ music.artworkUrl60 } alt={ music.trackId } /> */}
              <MusicCard music={ music } />
            </div>
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
