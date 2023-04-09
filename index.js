require('dotenv').config();
const express = require('express');
const twilioRouter = require('./router');

const app = express();

app.use(express.json());
app.use('/twilio-sms', twilioRouter);

app.get('/', () => {
  console.log('TWILIO OTP DEMO');
});

app.listen(5000, () => {
  console.log('Running on port 5000');
});
