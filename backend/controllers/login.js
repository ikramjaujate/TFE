const {userLogin} = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    // #swagger.tags = ['Auth']
    //#swagger.summary = 'Get JWT Token'
    try {
        
        const { username, password } = req.body;
        
        const user = await userLogin.findOne({
            where: { email: username}
        });
        
        const passwordHash = user.dataValues['password'].trim();
        const validPassword = await argon2.verify(passwordHash, password)
        
        if (!validPassword) return res.status(401).json({error: "Invalid Credentials"});
        
        const token = jwt.sign(
            { user_id: username },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "10000h",
            }
          );
        
        
        res.header('Authorization', token).json({
            error: null,
            data: {token}
        })
        return res;

        //return res.status(404).send('Invalid Credentials');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    login
}