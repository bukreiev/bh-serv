const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { TO, FROM } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);
sgMail.setApiKey(process.env.SG_KEY);

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Настройки для отправки почты (замените на свои данные)

  // Настройка письма
  const msg = {
    to: TO, // Ваш email для получения сообщений
    from: FROM, // Адрес отправителя
    subject: 'Новое сообщение с формы',
    text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
  };

  // Отправка почты
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
