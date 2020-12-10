/** @format */

const { Router } = require('express');
const router = Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const {
    username,
    email,
    login,
    password,
    country,
    timestamp,
    birth_date,
  } = req.body;

  const checkEmail = await User.findOne({ where: { email: email } });
  const checkLogin = await User.findOne({ where: { login: login } });
  const hashedPassword = await bcrypt.hash(password, 10);

  if (checkEmail) {
    res.send({ error: 'User with this email already exists' });
  } else if (checkLogin) {
    res.send({ error: 'User with this login already exists' });
  } else {
    User.create({
      username,
      email,
      login,
      password: hashedPassword,
      country,
      timestamp,
      birth_date,
    }).then((users) => {
      if (users) {
        res.send({
          message: 'You are registered please sign in to your account',
        });
      } else {
        res.send({ message: 'Something went wrong' });
      }
    });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const checkEmail = await User.findOne({ where: { email: email } });
  const checkLogin = await User.findOne({ where: { login: email } });

  const userPassword =
    checkEmail !== null
      ? checkEmail.dataValues.password
      : checkLogin !== null
      ? checkLogin.dataValues.password
      : '';

  const isMatch = await bcrypt.compare(password, userPassword);

  if (!checkEmail && !checkLogin) {
    res.send({ message: "User with this email or login doesn't exist" });
  } else if (!isMatch) {
    res.send({ message: 'Wrong password' });
  } else {
    const user = await User.findOne({ where: { password: userPassword } });
    res.send(user);
  }
});

module.exports = router;
