/** @format */

import * as yup from 'yup';

export const regSchema = yup.object().shape({
  email: yup.string().email().required(),
  login: yup.string().required(),
  password: yup.string().required(),
  username: yup.string().required(),
  country: yup.string().required(),
  dayOfTheBirth: yup
    .date()
    .default(() => new Date())
    .required(),
  checked: yup.bool().oneOf([true]).required(),
});
