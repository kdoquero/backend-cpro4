const models = require("../models");
const nodemailer = require("nodemailer");
const transport = {
    host: process.env.SMTP_SERVER,
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        client: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
}
class VerificationTokenController {
    static async prepareVerificationEmail(to=null,token=null) {
        let transporter = await nodemailer.createTransport(transport)
        let info = {
            client: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
        console.log("route email",info);
        
       await  transporter.verify(function (error, success) {
            if (error) {
                res.send({ message: "Email transporter error", error: error })
            } else {
                let message = {
                    from: process.env.EMAIL,
                    to: to,
                    subject: 'Verify Your Email',
                    html: `<p>Click on this link to verify your email </p><a href=${process.env.HOST_URL}/verification/?email=${to}&token=${token}>verify</a>`
                };
                ``
             return transporter.sendMail(message,(err,info)=>{
                  if(err)  res.send({ message: "Email send error", error: err })
                  console.log(info);  
              })
            }
        })
    }
    static VerifyEmail(req,res) {
        console.log("req.query.email",req.query.email);
        console.log("req.query.token",req.query.token);
        
        return models.Client.findOne({
            where: { email: req.query.email }
          })
            .then(client => {
              if (client.isVerified) {
                return res.status(202).send({message:`Email Already Verified`});
              } else {
                return models.VerificationToken.find({
                  where: { token: req.query.token }
                })
                  .then((foundToken) => {
                    if(foundToken){
                      return client
                        .update({ isVerified: true })
                        .then(updatedclient => {
                          return res.status(200).send({message:`client with ${client.email} has been verified`});
                        })
                        .catch(reason => {
                          return res.status(403).send({message:`Verification failed`});
                        });
                    } else {
                      return res.status(404).send({message:`Token expired` });
                    }
                  })
                  .catch(reason => {
                    return res.status(404).send({message:`Token expired`});
                  });
              }
            }).catch(error=>{
                res.status(404).send({message:`user not found`,error:error })
            })
    }
}

module.exports = VerificationTokenController;
