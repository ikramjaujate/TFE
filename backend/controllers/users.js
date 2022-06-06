const { userLogin, Sequelize } = require('../models');
const argon2 = require('argon2');

const getAllUsersLogin = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Get all users having an account'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const usersAccount = await userLogin.findAll();
        return res.status(200).json({ usersAccount });
    } catch (error) {
        return res.status(500).send(error.message);
    } 
}

const createUserLogin = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Creates a new person'
    #swagger.description = 'The person to create.'
    #swagger.parameters['parameter_name'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    $firstName: 'Jhon',
                    $lastName: 'Doe',
                    $email: 'test@test.com',
                    $VAT_num: 29,
                    $mobile: "32488907960"
                }
        } 
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        

        const existingEmail = await userLogin.findOne({
            where: {
                email: req.body.email
            }
        });
        if (existingEmail) {
            throw new Error("Email already taken")
        }
        const passwordHash = await argon2.hash(req.body.password)
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role,
            password : passwordHash
        }
        const newUser = await userLogin.create(user);

        if (!newUser) {
            throw new Error("User couldn't be created")
        };

        return res.status(201).json({
            newUser
        });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateUserLogin = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Update user'
    #swagger.description = 'Updating the user.'
    #swagger.security = [{
               "bearerAuth": []
    }] 

    */
    try {

        console.log(req.body.email)
        const user = await userLogin.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            throw new Error("No user")
        };
        const existingEmail = await userLogin.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existingEmail && user.id !== existingEmail.id) {
            throw new Error("Email already taken")
        }
        
        const validPassword = (user.password == req.body.password)
        
        console.log(validPassword)
        
        if(!validPassword){
            
            const passwordHash = await argon2.hash(req.body.password)
            await user.update(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    role: req.body.role,
                    password : passwordHash
                }
    
            )
        }

        await user.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                role: req.body.role
            }

        )
        await user.save()

        return res.status(200).json({ user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

const deleteUserLogin = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Update user'
    #swagger.description = 'Updating the user.'
    #swagger.security = [{
               "bearerAuth": []
    }] 

    */
    try {

        const user = await userLogin.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            throw new Error("No user")
        };
        
        
        await user.destroy(); 
        
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllUsersLogin,
    createUserLogin,
    updateUserLogin,
    deleteUserLogin
}