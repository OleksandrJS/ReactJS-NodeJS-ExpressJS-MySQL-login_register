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
        .post('http://localhost:5000/auth/signin/email', {
          email: formLogin.emailOrLogin,
          password: formLogin.password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.length === 0 || response.data.message) {
            axios
              .post('http://localhost:5000/auth/signin/login', {
                login: formLogin.emailOrLogin,
                password: formLogin.password,
              })
              .then((res) => {
                console.log(res);
                if (res.data.length !== 0 && !res.data.message) {
                  const data = res.data['0'];
                  const { username, email } = data;
                  login(username, email);
                } else {
                  setSignInMessage(res.data.message);
                  timeout();
                }
              });
          }
          if (!response.data.message) {
            const data = response.data['0'];
            const { username, email } = data;
            login(username, email);
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
