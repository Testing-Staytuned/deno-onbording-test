
import nodemailer from "npm:nodemailer@6.4.17";
export default async function mailer(receiveremail, code){
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
    // console.log(transporter);
    let info = await transporter.sendMail({
        from: "Social App Team",
        to: `${receiveremail}`,
        subject: "Email Verification",
        text: `Your Verification Code is ${code}`,
        html: `<b>Your Verification Code is ${code}</b>`
    });
    // console.log('mailer function called');
    console.log("Message sent : %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); 
    alert('Verification Code Sent to your Email');
}

// export default mailer;

// setInterval(()=>{
//     mailer('abhikumarparate20@gnu.ac.in', 'hi from nirnay')
// },5000)