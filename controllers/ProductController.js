const models = require("../models");

class ProductController {
    static getAll(req, res, ) {
        models.Product.findAll().then(products => {
            res.status(200).send(products);
        })
    }
    /**
    * retrieve one Product by his id
    * @param {incommingMessage} req 
    * @param {serverResponse} res 
    */
    static getById(req, res) {
        models.Product.findByPk(req.params.id).then(user => {
            res.status(200).send(user)
        })
    }
    static async manageProduct(req,res) {
        let name = req.body.name; let price = req.body.price; let image = req.body.image; let deck = req.body.deck; 
        let idShoppingCart = req.body.idShoppingCart;let idGiantBomb = req.body.idGiantBomb; let increment = req.body.increment;
        let idProduct = req.body.id;let qty =req.body.qty;
        try {
            let product = await models.Product.findOrCreate({where: {idGiantBomb: req.body.idGiantBomb}, defaults: {name:name,price:price,image:image,deck:deck}})
            let toBuy = await models.toBuy.findOrCreate({where: {idProduct: product[0].id,idShoppingCart:idShoppingCart},defaults:{idShoppingCart:idShoppingCart,qty:1,idGiantBomb:idGiantBomb}});  
            if (qty >toBuy[0].qty) {
              await toBuy[0].increment('qty', {by: 1})
            } else if(qty <toBuy[0].qty) {
               let decrementedToBuy = await toBuy[0].decrement('qty', {by: 1});
               let reloadTobuy = await decrementedToBuy.reload()          
               if (reloadTobuy.qty <=0) {            
                  await reloadTobuy.destroy()
               }
            }
            let shoppingCart = await models.ShoppingCart.findByPk(idShoppingCart,{include:[{model:models.toBuy,as :"addToBuys",include:models.Product}]})
            res.status(200).send(shoppingCart);
        } catch (error) {
            res.status(500).send({error:error})
        }
       

    }
    
}

module.exports = ProductController;
