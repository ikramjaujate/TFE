const {userLogin} = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userLogin.findOne({
            where: { email: email}
        });
        //console.log(user.dataValues['password'])

        const passwordHash = user.dataValues['password'].trim();
        const validPassword = await argon2.verify(passwordHash, password)
        
        if (!validPassword) return res.status(401).json({error: "Invalid Credentials"});

        const token = jwt.sign(
            { user_id: email },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "30m",
            }
          );
        res.header('auth-token', token).json({
            error: null,
            data: {token}
        })

        return res.status(404).send('Invalid Credentials');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    login
}