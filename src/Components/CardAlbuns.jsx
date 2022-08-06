import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardAlbuns extends Component {
  render() {
    const {
      album,
    } = this.props;
    const {
      artistName,
      artworkUrl100,
      collectionId,
      collectionName } = album;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <section className="card-container">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <span>{ collectionName }</span>
          <span>{ artistName }</span>
        </section>
      </Link>
    );
  }
}

CardAlbuns.propTypes = {
  objMusic: PropTypes.object,
}.isRequired;
