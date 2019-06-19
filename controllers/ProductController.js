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
    static async addProduct2(req,res) {
        let name = req.body.name; let price = req.body.price; let image = req.body.image; let deck = req.body.deck; 
        let idShoppingCart = req.body.idShoppingCart;let idGiantBomb = req.body.idGiantBomb; let increment = req.body.increment; let decrement = req.body.decrement;
        let idProduct = req.body.id;let qty =req.body.qty;
        console.log("body",req.body);
        try {
            let product = await models.Product.findOrCreate({where: {idGiantBomb: req.body.idGiantBomb}, defaults: {name:name,price:price,image:image,deck:deck}})
            let toBuy = await models.toBuy.findOrCreate({where: {idProduct: product[0].id,idShoppingCart:idShoppingCart},defaults:{idShoppingCart:idShoppingCart,qty:1,idGiantBomb:idGiantBomb}})
            console.log(toBuy[0].qty);
            
            if (qty >toBuy[0].qty) {
              await toBuy[0].increment('qty', {by: 1})
            } else if(qty <toBuy[0].qty) {
               let decrementedToBuy= await toBuy[0].decrement('qty', {by: 1});
               let reloadTobuy = await decrementedToBuy.reload()
               console.log("TCL: ProductController -> reloadTobuy", reloadTobuy)
                    
               if (reloadTobuy.qty ==0) {            
                  await reloadTobuy.destroy()
               }
            }
            let shoppingCart = await models.ShoppingCart.findByPk(idShoppingCart,{include:[{model:models.toBuy,as :"addToBuys",include:models.Product}]})
            res.status(200).send(shoppingCart);

        } catch (error) {
            res.status(500).send({error:error})
        }
       

    }
    static async addProduct(req,res) {
        let name = req.body.name; let price = req.body.price; let image = req.body.image; let deck = req.body.deck; 
        let idShoppingCart = req.body.idShoppingCart;let idGiantBomb = req.body.idGiantBomb; let increment = req.body.increment; let decrement = req.body.decrement;
        let idProduct = req.body.id
        //console.log("req.body",req.body);
        
        models.Product.findOrCreate({where: {
            idGiantBomb: req.body.idGiantBomb
        }, defaults: {name:name,price:price,image:image,deck:deck}}).then(product =>{
                //console.log("fee",product);
                
            models.toBuy.findOrCreate({where: {
                idProduct: product[0].dataValues.id,idShoppingCart:idShoppingCart},defaults:{idShoppingCart:idShoppingCart,qty:0,idGiantBomb:idGiantBomb}}).then(toBuy=>{
                    //console.log(toBuy);
                    if (increment) {
                        toBuy[0].increment('qty', {by: 1});
                    } else if (decrement) {
                        console.log(toBuy[0],"tobuy before");
                        toBuy[0].decrement('qty', {by: 1}).then(decrementedTobuy=>{
                            console.log(decrementedTobuy,"tobuy after");
                            decrementedTobuy.reload().then(decremented=>{
                                console.log(decremented);
                                if (decremented.qty==0) {
                                    models.toBuy.destroy({where:{id:toBuy[0].id}}).then(destroyed=>{
                                        console.log(destroyed,"destroyed");
                                        models.ShoppingCart.findByPk(idShoppingCart,{include:[{model:models.toBuy,as :"addToBuys",include:models.Product}]}).then(shoppingCart=>{
                                            res.send(shoppingCart)
                                        })
                                    })
                                }
                            })
                           
                            models.ShoppingCart.findByPk(idShoppingCart,{include:[{model:models.toBuy,as :"addToBuys",include:models.Product}]}).then(shoppingCart=>{
                                res.send(shoppingCart)
                            })
                        });
                       
                    }
                   
                   
                    
                }).catch(error=> res.status(500).send({message:"Can't find or create toBuy",error:error}))
        }).catch(error=> res.status(500).send({message:"Can't find or create product",error:error}))
    }

}

module.exports = ProductController;
