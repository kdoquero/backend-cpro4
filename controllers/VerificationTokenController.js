const models = require("../models");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
class VerificationTokenController {

  static async createTransporter() {
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
    const tokens = await oauth2Client.refreshAccessToken()
    const accessToken = tokens.credentials.access_token
    let transport = {
      host: process.env.SMTP_SERVER,
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      },
      tls: {
        rejectUnauthorized: false
      }
    }
    let transporter = await nodemailer.createTransport(transport)
    return transporter;

  }

  static async prepareVerificationEmail(res, to = null, token = null) {

    let transporter = await VerificationTokenController.createTransporter()

    
    console.log("to", to, "token", token);


    let message = {
      from: process.env.EMAIL,
      to: to,
      subject: 'Verify Your Email',
      html: `<p>Click on this link to verify your email </p><a href=${process.env.HOST_URL}/verification/?email=${to}&token=${token}>verify</a>`
    };
    return await transporter.sendMail(message, (err, info) => {
      if (err) console.log("err", err);
      console.log("info", info);

      return info
    })


  }
  static VerifyEmail(req, res) {
    console.log("req.query.email", req.query.email);
    console.log("req.query.token", req.query.token);

    return models.Client.findOne({
      where: { email: req.query.email }
    })
      .then(client => {
        if (client.isVerified) {
          return res.status(202).send({ message: `Email Already Verified` });
        } else {
          return models.VerificationToken.findOne({
            where: { token: req.query.token }
          })
            .then((foundToken) => {
              if (foundToken) {
                return client
                  .update({ isVerified: true })
                  .then(updatedclient => {
                    return res.status(200).send({ message: `client with ${client.email} has been verified` });
                  })
                  .catch(reason => {
                    return res.status(403).send({ message: `Verification failed` });
                  });
              } else {
                return res.status(404).send({ message: `Token expired` });
              }
            })
            .catch(reason => {
              return res.status(404).send({ message: `Token expired` });
            });
        }
      }).catch(error => {
        res.status(404).send({ message: `user not found`, error: error })
      })
  }
}

module.exports = VerificationTokenController;
