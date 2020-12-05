/** @format */

const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/register', (req, res) => {
  const {
    username,
    email,
    login,
    password,
    country,
    timestamp,
    birth_date,
  } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      'SELECT COUNT(*) AS cnt FROM users WHERE email =?',
      email,
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          if (data[0].cnt > 0) {
            res.send({ error: 'User with this email already exists' });
          } else {
            db.query(
              'SELECT COUNT(*) AS cnt FROM users WHERE login =?',
              login,
              function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  if (data[0].cnt > 0) {
                    res.send({ error: 'User with this login already exists' });
                  } else {
                    db.query(
                      'INSERT INTO users (email, login, password, username, birth_date, country, timestamp) VALUES(?,?,?,?,?,?,?)',
                      [
                        email,
                        login,
                        hash,
                        username,
                        birth_date,
                        country,
                        timestamp,
                      ],
                      (err, result) => {
                        if (err) {
                          console.log('error:', err);
                        }
                        if (result) {
                          res.send({
                            message:
                              'You are registered please sign in to your account',
                          });
                        } else {
                          res.send({ message: 'Something went wrong' });
                        }
                      },
                    );
                  }
                }
              },
            );
          }
        }
      },
    );
  });
});

router.post('/signin/email', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * from users WHERE email=?', email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          res.send(result);
        } else {
          res.send({ message: 'Wrong email' });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

router.post('/signin/login', (req, res) => {
  const { login, password } = req.body;

  db.query('SELECT * from users WHERE login=?', login, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          res.send(result);
        } else {
          res.send({ message: 'Wrong login' });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

module.exports = router;
