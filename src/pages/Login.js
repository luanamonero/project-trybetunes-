import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../component/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      disabled: true,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const nb = 3;
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

  async submmit(event) {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true }); // colocar o loading na tela antes da requisição completar
    const result = await createUser({ name }); // troca para a requisição e tira o loading
    this.setState({
      loading: false,
      returnApi: result,
    });
  }

  render() {
    const { value, name, disabled, loading, returnApi } = this.state;
    if (returnApi === 'OK') {
      return <Redirect to="/search" />;
    }
    const loadingElement = <Loading />;
    const form = (
      <form>
        <div className="form-group forms">
          <label htmlFor="name">
            Nome
            <input
              data-testid="login-name-input"
              type="text"
              className="form-control inputForm"
              value={ value }
              name={ name }
              onChange={ this.handleChange }
              placeholder="Usuário"
            />
          </label>
        </div>
        <button
          data-testid="login-submit-button"
          type="submit"
          className="btn btn-primary"
          disabled={ disabled }
          onClick={ (event) => this.submmit(event) }
        >
          Entrar
        </button>
      </form>
    );
    return (
      <div className="container d-flex justify-content-center" data-testid="page-login">
        <div className="card mt-5 w-50">
          <div className="card-body">
            { loading ? loadingElement : form }
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
