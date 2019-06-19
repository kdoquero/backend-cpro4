const models = require("../models");

class ShoppingCartController { 



    static getShoppingCart(req,res) {

        models.ShoppingCart.findOne({where: {
            id: req.params.id
        },include:[{model:models.toBuy,as :"addToBuys",include:models.Product}]}).then(shoppingCart=>{
            res.status(200).send(shoppingCart)
        }).catch(error=>{
            res.status(404).send({message: "Can't get shopping cart",error:error});
        })
    }
    

}

module.exports = ShoppingCartController;