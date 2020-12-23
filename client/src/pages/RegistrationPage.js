/** @format */

import { useState, useContext } from 'react';
import axios from 'axios';
import RegForm from '../components/RegForm';
import { AuthContext } from '../App';
import { AuthLinks } from '../components/AuthLinks';
import { regSchema } from '../Validators/regValidation';

const RegistrationPage = () => {
  const auth = useContext(AuthContext);

  const [formReg, setFormReg] = useState({
    email: '',
    login: '',
    password: '',
    username: '',
    country: '',
  });

  const [birthDate, setBirthDate] = useState('');

  const [checked, setChecked] = useState(false);

  const [regMessage, setRegMessage] = useState('');

  const handleChangeRegForm = (e) =>
    setFormReg({
      ...formReg,
      [e.target.name]: e.target.value,
    });

  const handleCheck = () => setChecked((prev) => !prev);

  const currentTime = +new Date();

  const timeout = () => setTimeout(() => setRegMessage(''), 5000);

  const registrationMessage = (error) => {
    setRegMessage(error);
    timeout();
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
      birthDate,
      checked,
    };

    const isValid = await regSchema.isValid(formData);

    if (isValid && email !== login) {
      try {
        const { data } = await axios.post(
          'http://localhost:5000/auth/register',
          {
            email: email,
            login: login,
            password: password,
            username: username,
            country: country,
            timestamp: currentTime,
            birth_date: birthDate,
          },
        );

        const { username: name, email: mail, jwtToken } = data;

        auth.login(name, mail, jwtToken);
      } catch (e) {
        registrationMessage(e.response.data.message);
      }
    } else {
      if (email === login && login !== '' && email !== '') {
        registrationMessage('Email and login must be unique');
      } else {
        registrationMessage('All fields must be filled');
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
      />
    </>
  );
};

export default RegistrationPage;
