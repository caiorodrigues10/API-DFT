import nodemailer from "nodemailer";
import { codeCreateAccount } from "../../../../../utils/email";
import { IEmailProvider } from "../IEmailProvider";

class NodemailerProvider implements IEmailProvider {
  async sendConfirmAccount(
    email: string,
    code: number,
    title: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const html = codeCreateAccount(code);

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: title,
      text: title,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

export { NodemailerProvider };
