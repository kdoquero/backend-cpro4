const models = require("../models");

class ProductController {
    static getAll(req,res,) {
        models.Product.findAll().then(products=>{
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
     
}

module.exports = ProductController;
