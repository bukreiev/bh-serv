const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { TO, FROM } = process.env;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
sgMail.setApiKey(process.env.SG_KEY);

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: TO,
    from: FROM,
    subject: 'Новое сообщение с формы',
    text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email отправлен успешно');
    res.status(200).send('Email отправлен успешно');
  } catch (error) {
    console.error(error);
    res.status(500).send('Что-то пошло не так');
  }
});

module.exports = app;
