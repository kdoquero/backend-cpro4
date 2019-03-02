
function adminMiddleware(req, res, next) {
    if (req.decoded.isAdmin ===true) {
         next();
    }else {
        return res.status(403).send({
            success: false,
            message: 'No an admin.'
        });
        
    }
}
    module.exports = adminMiddleware