const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendActivationMail(to, activateLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation',
      text: '',
      html: `<div>
           <h1>Follow the link to activate account</h1>
           <a href='${activateLink}'>${activateLink}</a>
         <div/>`,
    });
  }

  async resetPassword(name, to, changePassLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Reset password',
      text: '',
      html: `<div>
           <h1>Hi, ${name}!</h1>
           <p>Forgot your password?</p>
           <p>We received a request to reset the password for your account</p>
           <p>To reset your password, follow the link</p>
           <a href='${changePassLink}'>${changePassLink}</a>
           <hr/>
           <p>If you have not submitted a password reset request, ignore this message and change your password yourself.</p>
         <div/>`,
    });
  }
}

module.exports = new MailService();
