import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';
import '../Css/musicCard.css';

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
        <section className="section-album">
          <section data-testid="page-album" className="page-album">
            <p data-testid="artist-name">{artistName}</p>
            <p data-testid="album-name">{albumName}</p>
            <img src={ albumImage } alt={ albumName } />
          </section>
          <section className="section-musics">
            <div className="musics">
              {
                allMusicsAlbum.map((music) => (
                  <div key={ music.trackId } className="music-cards">
                    {/* <h2>{music.trackName}</h2> */}
                    <MusicCard music={ music } />
                  </div>
                ))
              }
            </div>
          </section>
        </section>
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
