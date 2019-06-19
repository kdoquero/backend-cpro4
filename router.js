"use strict"
const express = require('express');
var ClientController = require("./controllers/ClientController");
var ProductController = require("./controllers/ProductController");
var AuthMiddleware = require('./middlewares/authMiddleware');
var AuthController = require('./controllers/AuthController');
var AdminMiddleware = require('./middlewares/adminMiddleware');
var OwnerMiddleware = require('./middlewares/ownerMiddleware');
var VerificationTokenController = require('./controllers/VerificationTokenController');
var ShoppingCartController = require('./controllers/ShoppingCartController');
var ToBuyController = require('./controllers/ToBuyController');

var router = express.Router();
router.get('/', function (req, res) {
    res.send("welcome");
})
router.get('/test', function (req, res) {
    console.log('log test');

    res.send('test');
})

//Routeur crud Client;
router.get("/clients",AuthMiddleware,AdminMiddleware,ClientController.getAll);
router.get("/clients/:id",AuthMiddleware,OwnerMiddleware,ClientController.getById);
router.post("/clients",ClientController.register);
router.patch("/clients",AuthMiddleware,OwnerMiddleware,ClientController.patch);
router.delete("/clients",ClientController.delete);



//Router auth;
router.post("/auth/login", AuthController.login)
router.get("/auth/logout", AuthMiddleware, AuthController.logout)


//Router crud Products;
router.get("/products",ProductController.getAll);
router.get("/products/:id",ProductController.getById);
router.post("/products",ProductController.addProduct2);

//Router crud ShoppingCart;
router.get("/cart/:id",ShoppingCartController.getShoppingCart);
router.delete("/cart/:idCart/tobuy/:id",ToBuyController.deleteTobuy);
//Router Email 
router.get("/emailVerifcation",VerificationTokenController.VerifyEmail);
router.get("/verification/",VerificationTokenController.VerifyEmail);

module.exports = router;