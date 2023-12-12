const nodemailer = require('nodemailer');
const mailConfig = require('../../config/mail.config.json')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailConfig.auth_user,
    pass: mailConfig.auth_pass,
  },
});

function sendPasswordResetEmail(email, subject, text) {
  const mailOptions = {
    from: mailConfig.senderMail,
    to: email,
    subject: subject,
    text: text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = {
  sendPasswordResetEmail,
};
