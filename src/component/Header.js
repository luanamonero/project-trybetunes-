import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getName();
  }

  async getName() {
    this.setState({ loading: true });
    const requisição = await getUser();
    this.setState({
      name: requisição.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <div className="user">
          <h5>Bem vindo,</h5>
          <h2 data-testid="header-user-name">{ name }</h2>
        </div>
        <div
          className="navbar navbar-expand-lg navbar-light bg-light
        justify-content-center"
        >
          <nav className="navbar">
            <Link
              className="nav-link active"
              to="/search"
              data-testid="link-to-search"
            >
              Search
            </Link>
            <Link
              className="nav-link active"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>
            <Link
              className="nav-link active"
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
