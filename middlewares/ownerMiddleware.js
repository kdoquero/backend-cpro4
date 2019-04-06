
function ownerMiddleware(req, res, next) {
    console.log(req.decoded,req.params.id);
    
    if (req.decoded.id ==req.params.id || req.decoded.isAdmin ===true) {
         next();
    }else {
        return res.status(403).send({
            success: false,
            message: "not authorised, you're not the owner"
        });
        
    }
}
    module.exports = ownerMiddleware