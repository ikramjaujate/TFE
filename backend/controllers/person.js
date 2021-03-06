
const { Person, Address, Country, Company, Project, Sequelize } = require('../models');
const { Op } = require("sequelize");


const redisClient = require("./redis");


const createUser = async (req, res) => {
    // #swagger.tags = ['Person']
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
        const country = req.body.country;
        if(!validateCreateUserBody(req.body)) throw new Error("Bad request") 
        
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

        const person = {
            idAddress: createAddress.idAddress,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            VAT_num: req.body.vta,
            mobile: req.body.mobile,
            isActive: true
        }
        
        const user = await Person.create(person);
        
        if (!user) {
            throw new Error("User couldn't be created")
        };
        let value = await redisClient.get('users')
        if(value){
            redisClient.del('users')
        }
        return res.status(201).json({
            user
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllUsers = async (req, res) => {
    // #swagger.tags = ['Person']
    /* 
    #swagger.summary = 'Get all Person'
    #swagger.description = 'Get all the person without using ID'
    #swagger.security = [{
               "bearerAuth": []
    }]
    #swagger.responses[200] = {
            description: 'Person successfully obtained.',
            schema:
            { "person" : [
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
        
        let value =  await redisClient.get("users")
        
        if(!value){

            const users =  await Person.findAll({
                include: {
                    model: Address, include: [Country]
                }
            });
            
            redisClient.setEx("users", 3600, JSON.stringify(users));
            return res.status(200).json( {users });
        }
        
        const users = JSON.parse(value)
        return res.status(200).json( {users} );


        
        
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

const getUserById = async (req, res) => {
    // #swagger.tags = ['Person']
    /* 
    #swagger.summary = 'Gets a person by ID'
    #swagger.description = 'Numeric ID of the person to get.'
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
        console.log()
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
    // #swagger.tags = ['Person']
    /* 
    #swagger.summary = 'Gets the project using the person ID'
    #swagger.description = 'Numeric ID of the person to get.'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.parameters['id'] = {
                in: 'path',
                description: 'Person ID.',
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
    // #swagger.tags = ['Person']
    /* 
    #swagger.summary = 'Update person'
    #swagger.description = 'Updating the person .'
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
        
        req.body.vta = req.body.vta? req.body.vta :null
       
        const existingEmail = await Person.findOne({
            where: {
                email: req.body.email
            }
        });

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
        let value = await redisClient.get('users')
        if(value){
            redisClient.del('users')
        }

        return res.status(200).json({ user });
    } catch (error) {
        
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    // #swagger.tags = ['Person']
    /* 
    #swagger.summary = 'Delete person'
    #swagger.description = 'Delete the person .'
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
        
        const projectUser = await Project.findAll({
            where: {
                idPerson: req.body.id, status: { [Op.notIn]: ['Canceled', 'Pre-Sale', 'Closed']}
            }
        });
        
        if(projectUser.length){
            
            throw new Error("Cannot disable this user because this one is linked to one or more projects")
        }
        
        await user.update(
            {
                isActive: req.body.isActive
            }

        )
        await user.save()
        let value = await redisClient.get('users')
        if(value){
            redisClient.del('users')
        }

        return res.status(200).json({ user });
    } catch (error) {
        
        return res.status(500).send(error.message);
    }
}
const getSimpleUsersWithProjects = async (req, res) => {
    // #swagger.tags = ['Person']
    /* 
    #swagger.summary = 'Gets the projects using the persons'
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
function validateCreateUserBody(body){
   
    if(!body) return false;
    if(!body.country) return false;
    if(!body.street) return false;
    if(!body.locality) return false;
    if(!body.postalCode) return false;
    if(body.mobile){
        if(body.mobile[0] != '+' && body.mobile[0] != 0 ) return false
        const reg = /\D+/g
        const new_body = body.mobile.slice(1).replace(/\s/g, '')
        const match = new_body.match(reg)
        if(match) return false
    }
    return true;
}
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    getProjectByUserId,
    getSimpleUsersWithProjects,
    deleteUser,
    validateCreateUserBody
}