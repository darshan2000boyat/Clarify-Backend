const jwt = require("jsonwebtoken")
async function invoiceToken(req, res, next) {
    try {
        const token = req.headers["authorization"];
        if (token == undefined){
            res.status(401).json({
                error: true,
                success: false,
                message:"token is required",
                data: null
            })
        }
        const decoded = await jwt.verify(token,'My secret')
        if(decoded != undefined){
            req.body={"email":decoded.email}
            return next()
        }
    } catch (error) {
        res.status(401).json({
            error:true,
            success: false,
            message: " User unauthorized",
            data: null
        })
    }
}
module.exports=invoiceToken;