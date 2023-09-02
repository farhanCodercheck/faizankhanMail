
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fk796346@gmail.com',
      pass: 'bkvxtkgmzyklwiox',
    },
  });

  const mailDetails = {
    from: 'fk796346@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.error('Error sending email:', err);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent successfully');
      res.json({ success: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});





