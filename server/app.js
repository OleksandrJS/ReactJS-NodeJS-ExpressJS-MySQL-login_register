/** @format */

const express = require('express');
const db = require('./db');
const config = require('config');
const cors = require('cors');

const app = express();
app.use(express.json({ extended: true }));
app.use(cors());

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

app.use('/auth', require('./routes/auth.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('views'));
  app.use('/signin', express.static('views'));
  app.use('/user', express.static('views'));
}

const PORT = config.get('port') || 5000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`App has been started at http://localhost:${PORT}`);
});
