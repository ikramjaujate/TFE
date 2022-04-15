const { Material, Project_Materials, Project } = require('../models');
const { Op } = require("sequelize");
const redisClient = require("./redis");

const getAllMaterials = async (req, res) => {
    console.log('toto')
    // #swagger.tags = ['Material']
    /* 
    #swagger.summary = 'Get all materials'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.responses[200] = {
            description: 'Materials successfully obtained.',
            schema:
            { "materials" : [
                {
                    "idMaterial": 1,
                    "name": "Brick Pavers",
                    "quantity": 3,
                    "price": 4.51,
                    "type": "consumable",
                    "isBillable": false,
                    "createdAt": "2022-04-02T12:21:38.798Z",
                    "updatedAt": "2022-04-02T12:21:38.798Z"
                }
            ]
        }
    }
    */
    try {
        let value =  await redisClient.get("materials")
        
        if(!value){

            const materials = await Material.findAll();
            
            await redisClient.setEx("materials", 3600, JSON.stringify(materials));
            return res.status(200).json( {materials });
        }
        
        const materials = JSON.parse(value)
        return res.status(200).json( {materials} );
        
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getStockStatus = async (req, res) => {
    // #swagger.tags = ['Material']
    /* 
    #swagger.summary = 'Get status of materials '
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.responses[200] = {
            description: 'Materials successfully obtained.',
            schema:
            { "materials" : [
                {
                    "idMaterial": 1,
                    "name": "Brick Pavers",
                    "quantity": 3,
                    "reserved": 10,
                    "available": -7,
                    "price": 4.51,
                    "type": "consumable",
                    "isBillable": false,
                    "createdAt": "2022-04-02T12:21:38.798Z",
                    "updatedAt": "2022-04-02T12:21:38.798Z"
                }
            ]
        }
    }
    */
    try {
        let value =  await redisClient.get("materials")
        
        if(!value){

            const materials = await Material.findAll({
                include: [{
                    model: Project_Materials, include: [{
                        model: Project, where: { status: { [Op.not]: 'Canceled'} }, 
                    }]
                }]
            });
            await redisClient.setEx("materials", 3600, JSON.stringify(materials));
            await redisClient.setEx('materialsUpdated', 3600, false)
            return res.status(200).json( {materials });
        }
        const materials = JSON.parse(value)
        await redisClient.setEx('materialsUpdated', 3600, false)
        return res.status(200).json({ materials });

    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message);
    }
}

const getMaterialById = async (req, res) => {
    // #swagger.tags = ['Material']
    /* 
    #swagger.summary = 'Get a material by Id'
    #swagger.security = [{
               "bearerAuth": []
    }]
    #swagger.responses[200] = {
        description: 'Materials successfully obtained.',
        schema:
        { 
            "material" : {
                "idMaterial": 1,
                "name": "Brick Pavers",
                "quantity": 3,
                "price": 4.51,
                "type": "consumable",
                "isBillable": false,
                "createdAt": "2022-04-02T12:21:38.798Z",
                "updatedAt": "2022-04-02T12:21:38.798Z"
            }
        }
    }
    */
    try {
        const { id } = req.params;

        const material = await Material.findAll({
            where: { idMaterial: id }
        });

        if (material) {
            return res.status(200).json({ material });
        }
        return res.status(404).send('Material with the specified ID does not exist');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const createMaterial = async (req, res) => {
    // #swagger.tags = ['Material']
    /* 
    #swagger.summary = 'Creates a new material'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.parameters[obj] = {
        in: 'body',
        schema: {
            "name": "Brick Pavers",
            "quantity": 3,
            "price": 4.51,
            "type": "consumable",
            "isBillable": false,
        }
    }
    */
    try {

        const newMaterial = await Material.create(req.body);
        
        let value = await redisClient.get('materials')
        if(value){
            redisClient.del('materials')
        }
        await redisClient.setEx('materialsUpdated', 3600, true)

        return res.status(201).json({
            newMaterial
        });

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const updateMaterial = async (req, res) => {
    // #swagger.tags = ['Material']
    /* 
    #swagger.summary = 'Update material'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const material = await Material.findOne({
            where: {
                idMaterial: req.body.id
            }
        });

        if (!material) {
            throw new Error("No material");
        }

        material.update(req.body);
        await material.save();

        let value = await redisClient.get('materials')
        if(value){
            redisClient.del('materials')
        }
        await redisClient.setEx('materialsUpdated', 3600, true)
        return res.status(201).json({
            material,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const removeMaterialById = async (req, res) => {
    // #swagger.tags = ['Material']
    /* 
    #swagger.summary = 'Remove material'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        /*
        WARN => onDelete cascade so if a material is deleted all 
        project_materials linked to that material are also deleted!
        */
        const { id } = req.params;

        const material = await Material.findOne({
            where: { idMaterial: id }
        });

        await material.destroy();
        let value = await redisClient.get('materials')
        if(value){
            redisClient.del('materials')
        }
        await redisClient.setEx('materialsUpdated', 3600, true)
        return res.status(200).json({
            id,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const getDataWasUpdated = async (req, res) => {
    // #swagger.tags = ['Material']
    /* 
    #swagger.summary = 'Data was updated'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        let value = JSON.parse(await redisClient.get('materialsUpdated'))
        if(value){
            return res.status(200).send({'result' : true})
        }
        
        
        return res.status(200).send({'result' : false});
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    removeMaterialById,
    getStockStatus,
    getDataWasUpdated
}