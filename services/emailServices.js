const ContactMessage = require("../models/emailModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (req) => {
  const { name, email, phone, mobile, subject, message } = req;
  try {
    await ContactMessage.create({
      name,
      email,
      phone,
      mobile,
      subject,
      message,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: subject || "Contato do Cliente",
      text: `
          Nome: ${name}
          Email: ${email}
          Telefone: ${phone || "N/A"}
          Celular: ${mobile || "N/A"}
          Mensagem: ${message}
      `,
      html: `
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone || "N/A"}</p>
          <p><strong>Celular:</strong> ${mobile || "N/A"}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message}</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "E-mail enviado e mensagem salva com sucesso!",
    };
  } catch (error) {
    console.error("Erro no serviço de contato:", error);
    throw new Error("Erro ao processar a solicitação.");
  }
};

module.exports = sendEmail;
