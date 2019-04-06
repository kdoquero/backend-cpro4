
var jwt  = require('jsonwebtoken');

const bcrypt = require('bcrypt');

let models = require("../models");
/**
 * Controller responsible of auth
 */

class AuthController {
    /**
     * Log in the client
     * @param {incomingMessage} req 
     * @param {serverResponse} res 
     */
    static login(req,res) {
        const email = req.body.email
        const password = req.body.password;
       models.Client.findOne({
            where: {
                email: email
            }
        }).then(client=>{
            bcrypt.compare(password,client.password).then(resp =>{
                if (resp) {
                    
                    const payload = {id : client.id,isAdmin : client.isAdmin}
                    const secret = process.env.JWT_SECRET
                    const expiresIn = 48*60*60 // 4h
                    const token = jwt.sign(payload, secret, { expiresIn: expiresIn })
                    res.cookie("access_token", token,{ expires: new Date(Date.now() + 900000),sameSite :true})
                    res.status(200).send({ "success" : true})
                   
                } else {
                    res.status(500).json({
                        message: "wrong password",
                    });
                }
               
            } ).catch(err=>{
                res.status(500).json({
                    message: "unknow error",
                    error:err
                });
            })
        }).catch(error => {
            res.status(404).json({
                message: "the client doesn't exist",
                error: error
            })
        })

        //res.status(200).send({endpoint:"AuthController.login"})
    }
      /**
     * Log out the client
     * @param {incomingMessage} req 
     * @param {serverResponse} res 
     */
    static logout(req,res) {
        res.clearCookie('access_token');
        res.status(200).send("logged out")
    }
    
}

module.exports = AuthController;