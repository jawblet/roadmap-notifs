const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
    console.log(req.body.email);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: req.body.email, // Change to your recipient
        from: 'julia.bell@piano.io', // Change to your verified sender
        subject: `A feature you're watching changed its expected delivery date`,
        text: 'The new date is ',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
    .send(msg)
    .then((res) => {
        console.log(res);
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

    res.status(200).json("Email sent");
}