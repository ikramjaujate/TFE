const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {

    const token = req.header('Authorization').split("Bearer")[1].trim();
    //console.log(token)
    
    if (!token) return res.status(401).json({ error: 'Access Denied' });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({error: 'Invalid token'})
    }
}

const verifyAccess = async() => {
    try{
        console.log(req.header('Authorization').split("Bearer")[1].trim())
        const token = req.header('Authorization').split("Bearer")[1].trim()
        return jwt.verify(token, process.env.TOKEN_SECRET)
    }catch(e){
        return null
    }
}
module.exports = {
    verifyToken, 
    verifyAccess
};