import nodemailer from "npm:nodemailer@6.4.17";
 async function mailer(receiveremail, code) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
      
      },
    });

    let info = await transporter.sendMail({
      from: "ravalnirnay@gmail.com", // Change this line
      to: `${receiveremail}`,
      subject: "Email Verification",
      text: `Your Verification Code is ${code}`,
      html: `<b>Your Verification Code is ${code}</b>`,
    });

    console.log("Message sent : %s", info.messageId);
    console.log("Verification Code Sent to your Email");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

 async function mailer_msg(receiveremail, msg) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 25,
      secure: false,
      requireTLS: true,
      auth: {
      },
    });

    let info = await transporter.sendMail({
      from: "ravalnirnay@gmail.com", // Change this line
      to: `${receiveremail}`,
      subject: "Email Verification",
      text: `Your are ${msg}`,
      html: `<b>Your are ${msg}</b>`,
    });

    console.log("Message sent : %s", info.messageId);
    console.log("Verification Code Sent to your Email");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// mailer_msg('nirnayraval20@gnu.ac.in', "Hello");


import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
async function main() {
  
  const client = new SmtpClient();
  
  await client.connectTLS({
    hostname: "smtp.gmail.com",
    port: 465,
   
  });
  
  await client.send({
    from: "ravalnirnay@gmail.com",
    to: "nirnayraval20@gnu.ac.in",
    subject: "Hello from Deno Mailer",
    content: "Hello from Deno Mailer",
  });
  
  await client.close();
  console.log("Email sent successfully.");
}

export { mailer, mailer_msg , main};