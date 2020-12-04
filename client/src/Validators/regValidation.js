/** @format */

import * as yup from 'yup';

export const regSchema = yup.object().shape({
  email: yup.string().email().required(),
  login: yup.string().required(),
  password: yup.string().required(),
  username: yup.string().required(),
  country: yup.string().required(),
  dayOfTheBirth: yup.string().required(),
  checked: yup.bool().oneOf([true], 'Field must be checked').required(),
});
