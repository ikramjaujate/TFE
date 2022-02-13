const {Address} = require('../models');
const createAddress = async (req, res) => {
    try {
        console.log(req.body)
        const address = await Address.create(req.body);
        
        return res.status(201).json({
            address,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllAddress = async (req, res) => {
    try {
        const address = await Address.findAll();
        return res.status(200).json({ address });
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}
module.exports = {
    createAddress,
    getAllAddress
}