const {Company} = require('../models');
const getAllCompanies = async (req, res) => {
    // #swagger.tags = ['Company']
    /* 
    #swagger.summary = 'Get all companies'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const companies = await Company.findAll();
        return res.status(200).json({ companies });
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}

module.exports = {
    getAllCompanies
}