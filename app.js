/** @format */

const express = require('express');
const config = require('config');
const cors = require('cors');
const { sequelize, Countries } = require('./models');

const PORT = config.port || 5000;

const app = express();
app.use(express.json({ extended: true }));
app.use(cors());

app.get('/countries', async (req, res) => {
  const countries = await Countries.findAll({ raw: true });
  res.send(countries);
});

app.use('/auth', require('./routes/auth.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('views'));
  app.use('/signin', express.static('views'));
  app.use('/user', express.static('views'));
}

sequelize
  .sync()
  .then((req) => {
    console.log('MySQL connected...');
    app.listen(process.env.PORT || PORT, () => {
      console.log(`App has been started at port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
