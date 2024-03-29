const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

exports.sendOTP = async (req, res, next) => {
  const { countryCode, phoneNumber } = req.body;
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: 'sms',
      });
    res
      .status(200)
      .send(`OTP sent successfully : ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    console.error(error);
    res
      .status(error?.status || 400)
      .send(error?.message || 'Something went wrong.');
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { countryCode, phoneNumber, otp } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `${countryCode}${phoneNumber}`,
        code: otp,
      });
    res
      .status(200)
      .send(`OTP verified successfully! : ${JSON.stringify(verifiedResponse)}`);
  } catch (error) {
    console.error(error);
    res
      .status(error?.status || 400)
      .send(error?.message || 'Something went wrong.');
  }
};
