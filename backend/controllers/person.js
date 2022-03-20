
const { Person, Address, Country, Company, Project, Sequelize } = require('../models');
const Op = Sequelize.Op
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


        if (!createAddress) {
            throw new Error("Address couldn't be created")
        };
        //TODO : correction des vta en focntions des iso des countries
        if (req.body.vta) {
            if (country == "Belgium") {
                req.body.vta = 'BE ' + String(req.body.vta)
            } else {
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
    try {
        const { id } = req.params;
        /*const user = await Person.findOne({
            where: { idPerson: id },
            
        });*/
        const user = await Person.findAll({
            where: { idPerson: id },
            include: [{
                model: Address, include: [Country]

            }]
        });

        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const getProjectByUserId = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Gets the project using the user ID'
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
    try {
        const { id } = req.params;
       
        const user = await Project.findAll({
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
            where: {
                idPerson: req.body.id
            }
        });


        if (!user) {
            throw new Error("No user")
        };
        const existingEmail = await Person.findOne({
            where: {
                email: req.body.email
            }
        });

        if (req.body.vta) {
            if (req.body.country == "Belgium") {
                req.body.vta = 'BE ' + String(req.body.vta)
            } else {
                req.body.vta = 'FR ' + String(req.body.vta)
            }

        }

        if (existingEmail && user.idPerson !== existingEmail.idPerson) {
            throw new Error("Email already taken")
        }
        let existingVta = await Person.findOne({
            where: {
                VAT_num: req.body.vta
            }
        });

        if (existingVta && user.idPerson !== existingVta.idPerson && existingVta.VAT_num) {

            throw new Error("VAT already taken2")
        }
        existingVta = await Company.findOne({
            where: {
                VAT_num: req.body.vta
            }
        });
        if (existingVta && existingVta.VAT_num) {
            throw new Error("VAT already taken")
        }
        const userAddress = await Address.findOne({
            where: {
                idAddress: user.idAddress
            }
        })
        const userAddressCountry = await Country.findOne({
            where: {
                idCountry: userAddress.idCountry
            }
        })

        if (userAddressCountry.nicename != req.body.country) {
            const existingCountry = await Country.findOne({
                where: { nicename: req.body.country }
            });
            if (!existingCountry) {
                throw new Error("No country")
            };
            userAddress.idCountry = existingCountry.idCountry

            /* await userAddress.update({
                 idCountry: existingCountry.idCountry
             })
             await userAddress.save()*/
        }
        if (userAddress.street != req.body.street
            || userAddress.locality != req.body.locality
            || userAddress.postal_code != req.body.postalCode
            || userAddress.idCountry != userAddressCountry.idCountry) {

            await userAddress.update({
                street: req.body.street,
                locality: req.body.locality,
                postal_code: req.body.postalCode
                //idCountry: userAddress.idCountry
            })
            await userAddress.save()

        }

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
    } catch (error) {
        
        return res.status(500).send(error.message);
    }
}

const getSimpleUsersWithProjects = async (req, res) => {
    // #swagger.tags = ['Users']
    /* 
    #swagger.summary = 'Gets the projects using the users'
    #swagger.description = 'Numeric ID of the project to get.'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    */
    try {

        let users = await Person.findAll({

            include: [{
                model: Project

            }],
            attributes: ['idPerson', 'firstName', 'lastName']
        });
        let usersFiltered = users.filter(user => {
            return (user.Projects.length != 0)
        })
        let simpleUsers = []
        usersFiltered.forEach(user => {
            simpleUsers.push( {
                idPerson: user.idPerson,
                firstName: user.firstName,
                lastName: user.lastName
            })
        })


        if (simpleUsers) {
            return res.status(200).json({ simpleUsers });
        }
        return res.status(404).send('Project with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    getProjectByUserId,
    getSimpleUsersWithProjects
}