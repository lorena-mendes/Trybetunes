import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbuns extends Component {
  render() {
    const { album } = this.props;
    const {
      artistName,
      artworkUrl100,
      collectionId,
      collectionName } = album;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          key={ album.collectionId }
        >
          <section className="card-container">
            <h2>{ collectionName }</h2>
            <h3>{ artistName }</h3>
            <img
              src={ artworkUrl100 }
              alt={ `Imagem do álbum ${album.collectionName}` }
            />
          </section>
        </Link>
      </div>
    );
  }
}

CardAlbuns.propTypes = {
  album: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  })).isRequired,
};
