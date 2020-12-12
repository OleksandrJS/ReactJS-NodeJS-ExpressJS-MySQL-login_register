/** @format */

import { useState, useContext } from 'react';
import SigninForm from '../components/SigninForm';
import axios from 'axios';
import { AuthContext } from '../App';
import { AuthLinks } from '../components/AuthLinks';
import { signinSchema } from '../Validators/signinValidation';

const SignInPage = () => {
  const { login } = useContext(AuthContext);

  const [formLogin, setFormLogin] = useState({
    emailOrLogin: '',
    password: '',
  });

  const [signInMessage, setSignInMessage] = useState('');

  const handleLoginForm = (e) =>
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });

  const timeout = () => {
    setTimeout(() => setSignInMessage(''), 5000);
  };

  const handlerSignin = async (e) => {
    e.preventDefault();

    const { emailOrLogin, password } = formLogin;

    let formData = {
      emailOrLogin,
      password,
    };

    const isValid = await signinSchema.isValid(formData);

    if (isValid) {
      axios
        .post('https://login-mysql-app.herokuapp.com/auth/signin', {
          email: emailOrLogin,
          password: password,
        })
        .then((response) => {
          if (!response.data.message) {
            const { username, email } = response.data;
            login(username, email);
          } else {
            setSignInMessage(response.data.message);
            timeout();
          }
        });
    } else {
      setSignInMessage('All fields must be filled');
      timeout();
    }
  };
  return (
    <>
      <AuthLinks />
      <SigninForm
        formLogin={formLogin}
        handleLoginForm={handleLoginForm}
        handlerSignin={handlerSignin}
        signInMessage={signInMessage}
      />
    </>
  );
};

export default SignInPage;
