const {userLogin} = require('../models');
const argon2 = require('argon2');
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userLogin.findOne({
            where: { email: email}
        });
        //console.log(user.dataValues['password'])

        const passwordHash = user.dataValues['password'].trim();
        const validPassword = await argon2.verify(passwordHash, password)
        
        if (!validPassword) return res.status(401).json({error: "Incorrect password"});

        if (validPassword) {
            return res.status(200).json({ 'ok' :'ok' });
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    login
}