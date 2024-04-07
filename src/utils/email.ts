import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendEmail = async (options: {
  email: string;
  subject: string;
  text: string;
}) => {
  try {
    const transporter: Transporter<SMTPTransport.SentMessageInfo> =
      nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    const mailOptions = {
      from: "Greenshop <verification@mamajonovxayot.uz>",
      to: options.email,
      subject: options.subject,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export { sendEmail };
