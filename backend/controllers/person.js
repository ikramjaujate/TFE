const {Person, Address} = require('../models');
const createUser = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Creates a new user'
    #swagger.description = 'The user to create.'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        //console.log(req.body)
        const user = await Person.create(req.body);
        
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllUsers = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Get all users'
    #swagger.description = 'Get all the users without using ID'
    #swagger.security = [{
               "bearerAuth": []
    }]
    #swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema:
            { "users" : [
                {
                    firstName: 'Jhon',
                    lastname: "Doe",
                    email: 'j.doe@masterservices.com',
                    "VAT_num": 123456,
                    "mobile": "+32 488 00 00 00",
                    "addressId": 1,
                    "createdAt": "2022-02-13T12:37:54.635Z",
                    "updatedAt": "2022-02-13T12:37:54.635Z"
                }
            ]
        }
    }
    
    */
    try {
        const users = await Person.findAll({include : {
            model : Address
        }});
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}



const getUserById = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Gets a user by ID'
    #swagger.description = 'Numeric ID of the user to get.'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.parameters['id'] = {
                in: 'path',
                description: 'User ID.',
                required: true,
                type: 'integer'
            }
    */
   console.log('test')
    try {
        const { id } = req.params;
        const user = await Person.findOne({
            where: { idPerson: id },
        });
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = {
    createUser,
    getAllUsers,
    getUserById
}