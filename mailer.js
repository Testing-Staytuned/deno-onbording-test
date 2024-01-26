import nodemailer from "npm:nodemailer@6.4.17";

export default async function mailer(receiveremail, code){
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'ravalnirnay@gmail.com',
                pass: 'gpuedbdbtfycfjqx',
            },
        });

        let info = await transporter.sendMail({
            from: "ravalnirnay@gmail.com", // Change this line
            to: `${receiveremail}`,
            subject: "Email Verification",
            text: `Your Verification Code is ${code}`,
            html: `<b>Your Verification Code is ${code}</b>`
        });

        console.log("Message sent : %s", info.messageId);
        console.log('Verification Code Sent to your Email');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}