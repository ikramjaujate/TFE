const {Country} = require('../models');

const getAllCountries = async (req, res) => {
    // #swagger.tags = ['Country']
    /* 
    #swagger.summary = 'Get all countries'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const countries = await Country.findAll();
        //console.log(countries)
        return res.status(200).json({ countries });
    } catch (error) {
        return res.status(500).send(error.message);
    } 
}
module.exports = {
    getAllCountries
}