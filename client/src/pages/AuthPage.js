/** @format */

import { useState } from 'react';
import axios from 'axios';
import RegForm from '../components/RegForm';
import { AuthLinks } from '../components/AuthLinks';
import { regSchema } from '../Validators/regValidation';

const AuthPage = () => {
  const [formReg, setFormReg] = useState({
    email: '',
    login: '',
    password: '',
    username: '',
    country: '',
  });

  const [birthDate, setBirthDate] = useState('');

  const [checked, setChecked] = useState(false);

  const [regMessage, setRegMessage] = useState({
    error: '',
    success: '',
  });

  const [dayOfTheBirth, setDayOfTheBirth] = useState('');

  const handleChangeRegForm = (e) =>
    setFormReg({
      ...formReg,
      [e.target.name]: e.target.value,
    });

  const handleCheck = () => setChecked((prev) => !prev);

  const currentTime = +new Date();

  const timeout = () => {
    setTimeout(
      () =>
        setRegMessage({
          error: '',
          success: '',
        }),
      5000,
    );
  };

  const handlerRegistration = async (e) => {
    e.preventDefault();

    const { email, login, password, username, country } = formReg;

    let formData = {
      email,
      login,
      password,
      username,
      country,
      dayOfTheBirth,
      checked,
    };

    const isValid = await regSchema.isValid(formData);

    if (isValid & (email !== login)) {
      axios
        .post('http://localhost:5000/auth/register', {
          email: formReg.email,
          login: formReg.login,
          password: formReg.password,
          username: formReg.username,
          country: formReg.country,
          timestamp: currentTime,
          birth_date: dayOfTheBirth,
        })
        .then((response) => {
          setRegMessage({
            error: response.data.error || '',
            success: response.data.message || '',
          });
          timeout();
        });
    } else {
      if (email === login && login !== '' && email !== '') {
        setRegMessage({
          error: 'Email and login must be unique',
          success: '',
        });
        timeout();
      } else {
        setRegMessage({
          error: 'All fields must be filled',
          success: '',
        });
        timeout();
      }
    }
  };

  return (
    <>
      <AuthLinks />
      <RegForm
        formReg={formReg}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        checked={checked}
        handleChange={handleChangeRegForm}
        handleCheck={handleCheck}
        handlerRegistration={handlerRegistration}
        regMessage={regMessage}
        setDayOfTheBirth={setDayOfTheBirth}
      />
    </>
  );
};

export default AuthPage;