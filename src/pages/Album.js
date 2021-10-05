import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import MusicCard from '../component/musicCard';
import musicsAPI from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      album: '',
      musics: [],
    };
    this.getMusics = this.getMusics.bind(this);
  }

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await musicsAPI(id);
    this.setState({
      musics: musics.slice(1),
      artist: musics[0].artistName,
      album: musics[0].collectionName });
  }

  render() {
    const { musics, album, artist } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{artist}</h2>
          <h3 data-testid="album-name">{album}</h3>
          { musics.map((element) => (<MusicCard
            key={ element.trackId }
            musics={ element }
          />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

};

export default Album;
