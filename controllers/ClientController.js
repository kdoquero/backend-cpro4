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
        models.Client.findByPk(req.params.id).then(client => {
            models.ShoppingCart.findOne( {where: {
                clientId: req.params.id
            },include: "addToBuys"
        }).then(shoppingCart=>{
                delete client.dataValues.password;
                console.log(shoppingCart,client);

                    res.status(200).send({client: client,shoppingCart:shoppingCart})
            })
            
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
        const isAdmin = req.body.isAdmin
        if (!isAdmin) {
            isAdmin = false
        }
        bcrypt.hash(password, parseInt(saltRounds), function (err, hash) {
            models.Client.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (user) {
                    res.status(500).json({
                        message: "email already exist",
                    })
                } else {
                    models.Client.create(
                        {
                            name: name,
                            password: hash,
                            email: email,
                            isAdmin: isAdmin
                        }
                    ).then(user => {
                        models.ShoppingCart.create({
                            total: 0,
                            clientId : user.id
                        }).then(cart =>{
                            
                            models.VerificationToken.create({
                                clientId: user.id,
                                token: crypto({length:16})
                              }).then((result) => {
                                  console.log("verif",user.id,token,result);
                                  
                              VerificationTokenController.prepareVerificationEmail(user.email, result.token).then(value=>{
                                res.status(200).send({ userId: user.id,message: `${user.email} account created successfully`});
                              });
                                
                                 
                              })
                              .catch((error) => {
                                 res.status(500).send({message:"Verification token not created",error:error});
                              });
                        }).catch(error=>{
                            res.status(500).send({message:"Cart error creation",error:error});
                        })
                       
                        //res.status(200).send({ userId: user.id });
                    }).catch(error => {
                        res.status(500).send({ message: "cannot add user",error:error });

                    })
                }

            }).catch(error => {
                res.status(500).send({ error: "cannot verify user" });

            })


        })


    }
    /**
     * replace all the data of one user by his id
     * @param {incommingMessage} req 
     * @param {serverResponse} res 
     */
    static replace(req, res) {
        let newClient = req.body
       
        res.status(200).send({ endpoint: "UserController.replace" })
        
    }
    /**
     * insert a new data in the user object
     * @param {incommingMessage} req 
     * @param {serverResponse} res 
     */
    static patch(req, res) {
        res.status(200).send({ endpoint: "UserController.patch" })
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
