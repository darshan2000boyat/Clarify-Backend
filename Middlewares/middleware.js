const jwt = require("jsonwebtoken")

async function verifyToken(req, res, next){
    try {
        //1. Token extraction
        console.log(req.headers)
        const token = req.headers["authorization"];
        if (token == undefined){
            res.status(401).json({
                error: true,
                success: false,
                message: "Token is required",
                data: null
            })
        } 
        //2. Token verification

        const decoded =  await jwt.verify(token, 'ThisIsMySecret');
        console.log(decoded)

        //3. If the token is valid then extract data

        if (decoded != undefined){

            //4. Set this data to req.body 
            req.body={ ...req.body, "email": decoded.email}
            console.log(decoded.email)
            //5. Call next function & move execution control to controller
            return next()
        }
        //6. If the token is invalid then res.send (401)
        
    } catch (error) {
        res.status(401).json({
            error: true,
            success: false,
            message: "User unauthorized",
            data: null
        })
    }
}
module.exports=verifyToken;