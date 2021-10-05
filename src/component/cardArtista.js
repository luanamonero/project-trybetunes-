import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Artista extends React.Component {
  render() {
    const { listAlbuns } = this.props;
    const mapAlbuns = listAlbuns.map(({ artistName,
      collectionId, collectionName, artworkUrl100,
    }) => (
      <Link
        key={ collectionId }
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div>
          <img src={ artworkUrl100 } alt={ `album do artista ${artistName}` } />
          <p>{ collectionName }</p>
          <p>{ artistName }</p>
        </div>
      </Link>
    ));

    const number = 0;
    return (
      <div>
        { mapAlbuns.length > number ? mapAlbuns : 'Nenhum álbum foi encontrado'}
      </div>
    );
  }
}

Artista.propTypes = {
  listAlbuns: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default Artista;
