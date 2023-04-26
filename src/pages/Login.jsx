import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Loading from '../components/Loading';
import './css/Login.css';
import logo from '../images/sound-waves.png';

function Login({ handleSubmit, isLoading }) {
  const [nameValue, setNameValue] = useState('');
  const [validName, setValidName] = useState(false);

  const validateName = (value) => {
    const minLength = 3;
    setValidName(value.length >= minLength);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setNameValue(value);
    validateName(value);
  };

  return (
    <div data-testid="page-login" className="login__container">
      {isLoading
        ? (<Loading />)
        : (
          <>
            <h2 className="login__title">Login</h2>
            <img src={ logo } alt="logo" className="login__logo" />
            <form action="" className="login__form">
              <label htmlFor="user-name">Nome:</label>
              <input
                type="text"
                id="user-name"
                data-testid="login-name-input"
                value={ nameValue }
                onChange={ handleChange }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ !validName }
                onClick={ () => handleSubmit(nameValue) }
              >
                Entrar
              </button>
            </form>
          </>)}
    </div>
  );
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Login;