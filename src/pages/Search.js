import React from 'react';
import Header from '../component/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Artista from '../component/cardArtista';
import Loading from '../component/Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      disabled: true,
      artist: '',
      loading: false,
      list: [],
      albumArtist: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const nb = 2;
    if (value.length >= nb) {
      this.setState({
        name: value,
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  async onClick() {
    const { name } = this.state;
    this.setState({
      disabled: false,
      artist: name,
      loading: true,
    });
    console.log(name);
    const requisicao = await searchAlbumsAPI(name);
    console.log(requisicao);
    this.setState({
      name: '',
      loading: false,
      list: requisicao,
      albumArtist: true,
    });
  }

  render() {
    const { value, name, artist, list, disabled, loading, albumArtist } = this.state;
    const loadingElement = <Loading />;
    const resultArtist = (
      <p>
        Resultado de álbuns de:
        {' '}
        { artist }
      </p>
    );
    const forms = (
      <form className="form-inline input">
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="name" className="sr-only">
            <input
              data-testid="search-artist-input"
              type="text"
              className="form-control"
              value={ value }
              name={ name }
              onChange={ this.handleChange }
              placeholder="Nome do Artista"
            />
          </label>
          <button
            type="button"
            className="btn btn-primary mb-2"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.onClick }
          >
            Pesquisar
          </button>
        </div>
      </form>);

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? loadingElement : forms}
        { albumArtist ? resultArtist : '' }
        { albumArtist ? <Artista listAlbuns={ list } /> : '' }
      </div>
    );
  }
}

export default Search;
