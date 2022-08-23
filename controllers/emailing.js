// import path from 'path';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (req, res) => {

    const { to, subject, message } = req.body;

    // res.status(200).send(`${path.resolve()}`);

    sgMail.setApiKey(process.env.SGKEY);

    const msg = {
        to, // Change to your recipient
        from: process.env.SGFROM, // Change to your verified sender
        subject,
        // text: '',
        html: message,
    };

    try {
        await sgMail.send(msg);

        res.status(200).json({
            msg: 'Mail send successfully'
        });
    } catch (error) {
        console.log(error.response.body.errors);
        const messages = error.response.body.errors.map(e => e.message).join(' ');
        res.status(400).json({
            msg: messages
        });
    }
};

export {
    sendEmail
};