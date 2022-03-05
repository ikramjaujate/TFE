const { Person, Address, Country } = require('../models');

const createUser = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Creates a new user'
    #swagger.description = 'The user to create.'
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
        const country = req.body.country;
        
        const existingCountry = await Country.findOne({
            where: { nicename: country }
        });
        console.log(existingCountry)

        if (!existingCountry) {
            throw new Error("No country")
        };
        const address = {
            idCountry: existingCountry.idCountry,
            street: req.body.street,
            locality: req.body.locality,
            postal_code: req.body.postalCode
        }

        const createAddress = await Address.create(address);
        console.log(createAddress)

        if (!createAddress) {
            throw new Error("Address couldn't be created")
        };
        if(req.body.vta){
            if(country == "Belgium"){
                req.body.vta = 'BE ' + String(req.body.vta)
            }else{
                req.body.vta = 'FR ' + String(req.body.vta)
            }
           
        }
        const person = {
            idAddress: createAddress.idAddress,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            VAT_num: req.body.vta,
            mobile: req.body.mobile
        }

        const user = await Person.create(person);
        console.log(user)
        if (!user) {
            throw new Error("User couldn't be created")
        };

        return res.status(201).json({
            user
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
        const users = await Person.findAll({
            include: {
                model: Address, include: [Country]
            }
        });

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

const updateUser = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Update user'
    #swagger.description = 'Updating the user .'
    #swagger.security = [{
               "bearerAuth": []
    }] 

    */
    try {
       
       
        const user = await Person.findOne({
            where: { email: req.body.email }
        });
        
        if (user) {
            
            await user.update(
                {
                    idAddress: req.body.idAddress,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    VAT_num: req.body.vta,
                    mobile: req.body.mobile
                }

            )
            await user.save()

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
    getUserById,
    updateUser
}