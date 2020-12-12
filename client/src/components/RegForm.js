/** @format */

import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

const RegForm = ({
  formReg: { username, email, login, password },
  handleChange,
  checked,
  handleCheck,
  birthDate,
  setBirthDate,
  handlerRegistration,
  regMessage: { error, success },
}) => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(
        'https://login-mysql-app.herokuapp.com/countries',
      );
      setCountries(data.map((item) => item.country));
    };
    fetchData();
  }, []);

  const handleSelectClick = (e) => (e.target.className = 'select-active');

  const date = new Date();

  return (
    <>
      <form onSubmit={handlerRegistration} className="reg_form">
        <label>Registration</label>
        <input
          className="input-text"
          name="email"
          onChange={handleChange}
          value={email}
          placeholder="email"
        />
        <input
          className="input-text"
          name="login"
          onChange={handleChange}
          value={login}
          placeholder="login"
        />
        <input
          className="input-text"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          placeholder="password"
        />
        <input
          className="input-text"
          name="username"
          onChange={handleChange}
          value={username}
          placeholder="name"
        />
        <select
          onChange={handleChange}
          onClick={handleSelectClick}
          defaultValue=""
          name="country">
          <option hidden value="">
            Select your Country
          </option>
          {countries !== null &&
            countries.sort().map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
        </select>
        <DatePicker
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
          placeholderText="Select you birth date"
          maxDate={date.setFullYear(date.getFullYear() - 10)}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          yearDropdownItemNumber={40}
          scrollableYearDropdown
        />
        <div className="terms">
          <input
            type="checkbox"
            onChange={handleCheck}
            checked={checked}
            style={{ cursor: 'pointer' }}
          />
          <p onClick={handleCheck}>agree with terms and conditions</p>
        </div>
        <button className="btn" type="submit">
          Sign up
        </button>
      </form>
      <p className="Error">{error}</p>
      <p className="Success">{success}</p>
    </>
  );
};

export default RegForm;
