const emailService = require("../services/emailServices");

const sendEmail = async (req, res) => {
  try {
    const send = await emailService(req.body);
    res.status(200).json(send);
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

module.exports = { sendEmail };
