const nodemailer = require("nodemailer");

const email = process.env.EMAIL;
const pass = process.env.PASS;

const sendEmail = async (fromEmail, toEmails, subject, text) => {
  // Join the array of email addresses into a comma-separated string
  const sendToEmails = toEmails.join(", ");

  let config = {
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  };

  const transporter = nodemailer.createTransport(config);

  let message = {
    from: email,
    to: sendToEmails,
    subject: subject,
    text: text,
  };
  try {
    const info = await transporter.sendMail(message);
    // console.log(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
