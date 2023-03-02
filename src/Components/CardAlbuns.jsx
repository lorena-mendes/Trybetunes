import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../Css/cardAlbuns.css';

export default class CardAlbuns extends Component {
  render() {
    const { album } = this.props;
    const {
      artworkUrl100,
      collectionId,
      collectionName } = album;
    return (
      <section className="section-albuns">
        <div className="albuns">
          <img
            src={ artworkUrl100 }
            alt={ `Imagem do álbum ${album.collectionName}` }
          />
          <div>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
              key={ album.collectionId }
            >
              <h2>{ collectionName }</h2>
            </Link>
          </div>
        </div>
      </section>
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
