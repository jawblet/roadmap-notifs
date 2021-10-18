const sgMail = require('@sendgrid/mail');

export default async function sendEmail(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("send email");

    try {
        const email = await sgMail.send(msg);
        return email;
    } catch (error) {
        console.error(error);
        return error;
  }
}