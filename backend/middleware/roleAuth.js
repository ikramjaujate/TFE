const {userLogin} = require('../models');
const jwt = require('jsonwebtoken')
const {verifyAccess} = require('./auth')
const checkRoleAuth = (roles) => async(req, res, next) => {
    
    try {
        const token = req.header('Authorization').split("Bearer")[1].trim();
        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET)
        
        const userData = await userLogin.findOne({
            where: { email: tokenData.user_id}
        });
        
        if(roles.includes(userData.role)){
            console.log(userData.role)
            next()
        }
        else{
            res.status(400).json({error: 'Not allowed'})
        }
    } catch (error) {
        res.status(400).json({error: 'Not allowed'})
    }
}

module.exports = checkRoleAuth;