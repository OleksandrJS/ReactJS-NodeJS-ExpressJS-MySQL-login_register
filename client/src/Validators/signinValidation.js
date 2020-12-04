/** @format */

import * as yup from 'yup';

export const signinSchema = yup.object().shape({
  emailOrLogin: yup.string().required(),
  password: yup.string().required(),
});
