import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  // Consultado do repositório: do Wellington Fonseca
  // https://github.com/tryber/sd-014-b-project-trybetunes/pull/53
  handleChange = (music) => {
    const { checked } = this.state;
    console.log(music);
    if (checked === false) { // se não tiver check, add a música
      this.setState({
        loading: true,
      });
      addSong(music)
        .then(() => this.setState({
          loading: false,
          checked: true,
        }));
    }
  }

  render() {
    const { musics: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checked } = this.state;
    const loadingElement = <Loading />;
    const musics = (
      <>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="id">
          <input
            type="checkbox"
            id="id"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ () => this.handleChange(this.props) } // ao marcar, chama a função handlechange, passando o objeto recebido pela api desconstruida como paramêtro
          />
        </label>
      </>
    );
    return (
      <div>
        {!loading ? musics : loadingElement}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
