class EmailService {
  sendEmail(to, subject, body) {
    console.log(`Sending email to ${to}...`);
    return true;
  }
}
module.exports = EmailService;