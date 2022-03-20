const {Address} = require('../models');
const createAddress = async (req, res) => {
    // #swagger.tags = ['Address']
    /* 
    #swagger.summary = 'Creates a new address'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        
        const address = await Address.create(req.body);
        
        return res.status(201).json({
            address,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllAddress = async (req, res) => {
    // #swagger.tags = ['Address']
    /* 
    #swagger.summary = 'Get all adresses'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const address = await Address.findAll({include : {
            model : Country
        }});
        return res.status(200).json({ address });
    } catch (error) {
        return res.status(500).send(error.message);
    } 
}
module.exports = {
    createAddress,
    getAllAddress
}