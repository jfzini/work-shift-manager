import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
// import './css/Login.css';

function Login({ handleSubmit, isLoading }) {
  const [nameValue, setNameValue] = useState('');
  const [hoursValue, setHoursValue] = useState(8);
  const [minutesValue, setMinutesValue] = useState(0);
  const [validFields, setValidFields] = useState(false);

  const validateFields = () => {
    const minLength = 3;
    const validName = nameValue.length >= minLength;
    const validHour = hoursValue <= 12 && hoursValue >=0
    const validMinute = minutesValue <= 59 && minutesValue >=0
    setValidFields(validName && validHour && validMinute);
  };

  useEffect(() => {
    validateFields();
  }, [nameValue, hoursValue, minutesValue])
  
  const handleChange = ({ target }, setStateFunc) => {
    let { value } = target;
    if (setStateFunc == setHoursValue) {
      value = value > 12 ? 12 : value;
      value = value < 0 ? 0 : value;
    }
    if (setStateFunc == setMinutesValue) {
      value = value > 59 ? 59 : value;
      value = value < 0 ? 0 : value;
    }
    setStateFunc(value);
  };

  return (
    <div data-testid="page-login" className="login__container">
      {isLoading
        ? (<Loading />)
        : (
          <>
            <h2 className="login__title">Login</h2>
            {/* <img src={ logo } alt="logo" className="login__logo" /> */}
            <form action="" className="login__form">
              <label htmlFor="user-name">Nome:</label>
              <input
                type="text"
                id="user-name"
                value={ nameValue }
                onChange={(e) => handleChange(e, setNameValue) }
              />
              <fieldset>
                <legend>Jornada</legend>
              <label htmlFor="login-hours-shift">Horas:</label>
              <input
                type="number"
                id="login-hours-shift"
                value={ hoursValue }
                placeholder='horas'
                max="12"
                onChange={(e) => handleChange(e, setHoursValue) }
              />
              <label htmlFor="login-minutes-shift">Minutos:</label>
              <input
                type="number"
                id="login-minutes-shift"
                value={ minutesValue }
                placeholder='minutos'
                max="59"
                onChange={(e) => handleChange(e, setMinutesValue) }
              />
              </fieldset>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ !validFields }
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