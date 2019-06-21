const models = require("../models");


class TobuyController { 



    static async deleteTobuy(req,res) {
        let id =req.params.id;
     
        let idCart = req.params.idCart;
        try {
            await models.toBuy.destroy({where:{id:id}})
            let shoppingCart = await models.ShoppingCart.findByPk(idCart,{include:[{model:models.toBuy,as :"addToBuys",include:models.Product}]})
            //console.log(shoppingCart);
            
            res.status(200).send(shoppingCart)
        } catch (error) {
            //console.log(error);
            
            res.status(404).send({message:"Couln't delete item",status:error})
        }
    }
    

}

module.exports = TobuyController;