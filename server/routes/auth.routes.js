/** @format */

const { Router } = require('express');
const router = Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
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

    if (checkEmail) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const checkLogin = await User.findOne({ where: { login: login } });

    if (checkLogin) {
      return res
        .status(400)
        .json({ message: 'User with this login already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      login,
      password: hashedPassword,
      country,
      timestamp,
      birth_date,
    });

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    user.dataValues.jwtToken = token;

    res.status(200).json(user);
  } catch (e) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { emailOrLogin, password } = req.body;

    const checkEmail = await User.findOne({ where: { email: emailOrLogin } });

    const checkLogin = await User.findOne({ where: { login: emailOrLogin } });

    if (!checkEmail && !checkLogin) {
      return res
        .status(400)
        .json({ message: "User with this email or login doesn't exist" });
    }

    const userPassword = checkEmail
      ? checkEmail.password
      : checkLogin
      ? checkLogin.password
      : '';

    const isMatch = await bcrypt.compare(password, userPassword);

    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const user = await User.findOne({ where: { password: userPassword } });

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    user.dataValues.jwtToken = token;

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
