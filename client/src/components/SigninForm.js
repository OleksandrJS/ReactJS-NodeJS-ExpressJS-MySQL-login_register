/** @format */

const SigninForm = ({
  formLogin: { emailOrLogin, password },
  handleLoginForm,
  handlerSignin,
  signInMessage,
}) => {
  return (
    <>
      <form onSubmit={handlerSignin} className="signin_form">
        <label>Sign in</label>
        <input
          className="input-text"
          name="emailOrLogin"
          onChange={handleLoginForm}
          value={emailOrLogin}
          placeholder="login or email"
        />
        <input
          className="input-text"
          name="password"
          type="password"
          onChange={handleLoginForm}
          value={password}
          placeholder="password"
        />
        <button className="btn" type="submit">
          Sign in
        </button>
      </form>
      <p className="Error">{signInMessage}</p>
    </>
  );
};

export default SigninForm;
