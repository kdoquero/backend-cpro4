'use strict';
const bcrypt = require('bcrypt');
const models = require("../models");
const fs = require('fs')
const saltRounds = process.env.SALT_ROUND;
const crypto = require("crypto-random-string")
const VerificationTokenController = require("./VerificationTokenController")
//const salt = process.env.BCRYPT_SALT
/**
 * Controller responsible of the user
 */
class UserController {
    /**
     * List all users
     * @param {incommingMessage} req 
     * @param {serverResponse} res 
     */
    static getAll(req, res) {
        models.Client.findAll().then(function (users) {
            res.status(200).send(users)
        })

    }
    /**
     * retrieve one user by his id
     * @param {incommingMessage} req 
     * @param {serverResponse} res 
     */
    static getById(req, res) {
        models.Client.findByPk(req.params.id,{include:[{model:models.ShoppingCart,include:[{model:models.toBuy,as :"addToBuys",include:models.Product}]}]}).then(client => {
            delete client.dataValues["password"];
            console.log("client",client,"client");
            
                res.status(200).send(client)
            

        })
    }

    /**
     * register a new user
     * @param {incomingMessage } req 
     * @param {serverResponse} res 
     */
    static register(req, res) {
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;
        let isAdmin = req.body.isAdmin;
        const token = crypto({ length: 16 }).toString();
        if (!isAdmin) {
            isAdmin = false
        }
        bcrypt.hash(password, parseInt(saltRounds), (err, hash) => {
                if (err) return res.send({message:"password not created",error:err})
          return models.Client.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (user) {
                    res.status(500).json({
                        message: "email already exist",
                    })
                } else {
                    return models.Client.create(
                        {
                            name: name,
                            password: hash,
                            email: email,
                            isAdmin: isAdmin
                        }
                    ).then(user => {
                        return models.ShoppingCart.create({
                            total: 0,
                            clientId: user.id
                        }).then(cart => {
                            return models.VerificationToken.create({
                                clientId: user.id,
                                token: token
                            }).then(result => {
                                VerificationTokenController.prepareVerificationEmail(res,email, result.token).then(value=>{
                                     res.status(200).send({ userId: user.id,message: `${user.email} account created successfully`});
                                })
                            }).catch((error) => {
                                res.status(500).send({ message: "lol token not created", error: error });
                            });
                        }).catch((error) => {
                            res.status(500).send({ message: "cart not created", error: error });
                        });
                    }).catch(error => {
                        res.status(500).send({ message: "user not created", error: error });
                    })
                }
            })
        })
    }
    /**
     * replace all the data of one user by his id
     * @param {incommingMessage} req 
     * @param {serverResponse} res 
     */
    static replace(req, res) {
      
            res.status(200).send({ endpoint: "UserController.replace",user:updated })
     
    }
    /**
     * insert a new data in the user object
     * @param {incommingMessage} req 
     * @param {serverResponse} res 
     */
    static patch(req, res) {
        let id = req.body.id;
        let client =req.body;
        models.Client.update({name:client.name,avatar:client.avatar},{where:{id:id}}).then(updated=>{
            console.log(updated)
            res.status(200).send({ endpoint: "UserController.replace",user:updated })
        }).catch(error=>{
            res.status(404).send({ endpoint: "UserController.replace" })
        })
    }
    /**
     * delete one user by his id
     * @param {incommingMessage} req 
     * @param {serverResponse} res 
     */
    static delete(req, res) {
        models.Client.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (user.id === req.decoded.id) {
                models.Client.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(post => {
                    res.status(200).send("user deleted")
                }).catch(error => {
                    res.status(500).json({
                        message: "unable to delete user",
                        error: error
                    })
                })
            } else {
                res.status(403).send("Not authorized")

            }
        }).catch(error => {
            res.status(500).send("nothing found")

        })


    }

}

module.exports = UserController;

//{attributes: { exclude: ['password']},include:[models.posts]} 
