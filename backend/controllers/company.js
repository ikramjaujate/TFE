const {Company, Address, Country, Person, Project} = require('../models');
const { Op } = require("sequelize");
const getAllCompanies = async (req, res) => {
    // #swagger.tags = ['Company']
    /* 
    #swagger.summary = 'Get all companies'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    
    try {
        const companies = await Company.findAll({include : {
            model : Address, include:  [Country]
        }});

        return res.status(200).json({ companies });
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}


const getCompanyById = async (req, res) => {
    // #swagger.tags = ['Company']
    /* 
    #swagger.summary = 'Gets a company by ID'
    #swagger.description = 'Numeric ID of the company to get.'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.parameters['id'] = {
                in: 'path',
                description: 'Company ID.',
                required: true,
                type: 'integer'
            }
    */
    try {
        const { id } = req.params;
        
        const company = await Company.findAll({
            where: {idCompany: id},
            include: [{
              model: Address, include: [Country]
              
             }]
        });
        

        if (company) {
            return res.status(200).json({ company });
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const createCompany = async (req, res) => {
    // #swagger.tags = ['Company']
    /* 
    #swagger.summary = 'Creates a new company'
    #swagger.description = 'The company to create.'
    #swagger.parameters['parameter_name'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    $name: 'Donuts SLA',
                    $email: 'test@test.com',
                    $VAT_num: 29,
                    $mobile: "32488907960"
                }
        } 
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        console.log(req.body)
        if(!validateCreateCompanyBody(req.body)) throw new Error("Bad request")
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
       
        const company = {
            idAddress: createAddress.idAddress,
            name: req.body.name,
            email: req.body.email,
            VAT_num: req.body.vta,
            mobile: req.body.mobile,
            isActive: true
        }

        const companyCreated = await Company.create(company);
        
        if (!companyCreated) {
            throw new Error("Company couldn't be created")
        };
        

        return res.status(201).json({
            companyCreated
        });
        
    } catch (error) {
        
        return res.status(500).json({ error: error.message })
    }
}

const updateCompany = async (req, res) => {
    // #swagger.tags = ['Company']
    /* 
    #swagger.summary = 'Update company'
    #swagger.description = 'Updating the company .'
    #swagger.security = [{
               "bearerAuth": []
    }] 

    */
    try {
        
        
        const company = await Company.findOne({
            where: {
                idCompany: req.body.id
            }
        });
        
        if (!company) {
            throw new Error("No company")
        };
        const existingEmail = await Company.findOne({
            where: {
                email: req.body.email
            }
        });
        
        if (existingEmail && company.idCompany !== existingEmail.idCompany) {
            throw new Error("Email already taken")
        }
        let existingVta = await Company.findOne({
            where: {
                VAT_num: req.body.vta
            }
        });
        
        if (existingVta && company.idCompany !== existingVta.idCompany) {
            throw new Error("VAT already taken")
        }
        existingVta = await Person.findOne({
                where: {
                    VAT_num: req.body.vta
                }
        });
        if (existingVta) {
            throw new Error("VAT already taken")
        }
        
        const companyAddress = await Address.findOne({
            where: {
                idAddress: company.idAddress
            }
        })
        const companyAddressCountry = await Country.findOne({
            where: {
                idCountry: companyAddress.idCountry
            }
        })

        if (companyAddressCountry.nicename != req.body.country) {
            const existingCountry = await Country.findOne({
                where: { nicename: req.body.country }
            });
            if (!existingCountry) {
                throw new Error("No country")
            };
            companyAddress.idCountry = existingCountry.idCountry
            
        }
        if (companyAddress.street != req.body.street
            || companyAddress.locality != req.body.locality
            || companyAddress.postal_code != req.body.postalCode
            || companyAddress.idCountry != companyAddressCountry.idCountry) {

            await companyAddress.update({
                street: req.body.street,
                locality: req.body.locality,
                postal_code: req.body.postalCode
                //idCountry: companyAddress.idCountry
            })
            await companyAddress.save()

        }
        
        await company.update(
            {
                idAddress: req.body.idAddress,
                name: req.body.name,
                email: req.body.email,
                VAT_num: req.body.vta,
                mobile: req.body.mobile
            }

        )
        await company.save()

        return res.status(200).json({ company });
    } catch (error) {
        
        return res.status(500).send(error.message);
    }
}
const deleteCompany = async (req, res) => {
    // #swagger.tags = ['Company']
    /* 
    #swagger.summary = 'Delete company'
    #swagger.description = 'Delete the company .'
    #swagger.security = [{
               "bearerAuth": []
    }] 

    */
    try {

       
        const company = await Company.findOne({
            where: {
                idCompany: req.body.id
            }
        });
        
        if (!company) {
            throw new Error("No company")
        };
        
        
        const projectUser = await Project.findAll({
            where: {
                idCompany: req.body.id,  status: { [Op.notIn]: ['Canceled', 'Pre-Sale', 'Closed']}
            }
        });
        
        if(projectUser.length){
            throw new Error("This user cannot be removed because it is linked to one or more projects.")
        }
        
        await company.update(
            {
                isActive: req.body.isActive
            }

        )
        await company.save()
        
        

        return res.status(200).json({ company });
    } catch (error) {
        
        return res.status(500).send(error.message);
    }
}
const getProjectByCompanyId = async (req, res) => {
    // #swagger.tags = ['Company']
    /* 
    #swagger.summary = 'Gets the project using the company ID'
    #swagger.description = 'Numeric ID of the company to get.'
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
       
        const company = await Project.findAll({
            where: {idCompany: id},
            
        });
       
        
        if (company) {
            
            return res.status(200).json({ company });
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
function validateCreateCompanyBody(body){
    if(!body) return false;
    if(!body.name) return false;
    if(body.mobile){
        if(body.mobile[0] != '+' && body.mobile[0] != 0 ) return false
        const reg = /\D+/g
        
        const new_body = body.mobile.slice(1)
        const match = new_body.match(reg)
        
        if(match) return true
    }
    if(!body.vta) return false;
    return true;
}

module.exports = {
    getAllCompanies,
    createCompany,
    updateCompany,
    getCompanyById,
    getProjectByCompanyId,
    deleteCompany,
    validateCreateCompanyBody
}