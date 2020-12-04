/** @format */

const express = require('express');
const mysql = require('mysql');
const config = require('config');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'usersdb',
  password: 'password',
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('MySQL connected...');
  }
});

app.get('/countries', (req, res) => {
  db.query('SELECT * from countries', (err, results) => {
    res.send(results);
  });
});

app.post('/auth/register', (req, res) => {
  const {
    username,
    email,
    login,
    password,
    country,
    timestamp,
    birth_date,
  } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
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
              'INSERT INTO users (email, login, password, username, birth_date, country, timestamp) VALUES(?,?,?,?,?,?,?)',
              [email, login, hash, username, birth_date, country, timestamp],
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
  });
});

app.post('/auth/signin/email', (req, res) => {
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

app.post('/auth/signin/login', (req, res) => {
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

const PORT = config.get('port') || 5000;

app.listen(PORT, () => {
  console.log(`App has been started at http://localhost:${PORT}`);
});
