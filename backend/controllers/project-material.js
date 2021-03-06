const { Project_Materials, Project } = require('../models');
const redisClient = require("./redis");

const getAllProjectMaterials = async (req, res) => {
    // #swagger.tags = ['Project_Materials']
    /* 
    #swagger.summary = 'Get all project-materials'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const projectMaterials = await Project_Materials.findAll();
        return res.status(200).json({ projectMaterials });
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getProjectMaterialById = async (req, res) => {
    // #swagger.tags = ['Project_Materials']
    /* 
    #swagger.summary = 'Get a project-material by Id'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { id } = req.params;

        const projectMaterial = await Project_Materials.findOne({
            where: { idMaterial: id }
        });

        if (projectMaterial) {
            return res.status(200).json({ projectMaterial });
        }
        return res.status(404).send('Project-material with the specified ID does not exist');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getProjectsByMaterialId = async (req, res) => {
    // #swagger.tags = ['Project_Materials']
    /* 
    #swagger.summary = 'Get all projects-materials by material id'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { id } = req.params;

        const projectMaterial = await Project_Materials.findAll({
            where: { idMaterial: id }, include: [{
                model: Project
            }]
        });


        if (projectMaterial) {
            return res.status(200).json({ projectMaterial });
        }
        console.log(projectMaterial)
        return res.status(404).send('Project-material with the specified ID does not exist');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const createProjectMaterial = async (req, res) => {
    // #swagger.tags = ['Project_Materials']
    /* 
    #swagger.summary = 'Creates a new project-material'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {

        const newProjectMaterial = await Project_Materials.create(req.body);

        let value = await redisClient.get('materials')
        if(value){
            redisClient.del('materials')
        }
        return res.status(201).json({
            newProjectMaterial
        });

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const bulkUpdateProjectMaterial = async (req, res) => {
    // #swagger.tags = ['Project_Materials']
    /* 
    #swagger.summary = 'Bulk update all project-materials for one project'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        await Project_Materials.destroy({
            where: { idProject: req.body.idProject }
        })

        const newProjectMaterials = await Project_Materials.bulkCreate(req.body.materials);

        return res.status(201).json({
            newProjectMaterials
        });

    } catch (error) {
        console.log('error', error)
        return res.status(400).json({ error: error.message })
    }
}

const updateProjectMaterial = async (req, res) => {
    // #swagger.tags = ['Project_Materials']
    /* 
    #swagger.summary = 'Update project-material'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        
        const projectMaterial = await Project_Materials.findOne({
            where: {
                idProjMat: req.body.id
            }
        });

        if (!projectMaterial) {
            throw new Error("No material");
        }

        projectMaterial.update(req.body);
        await projectMaterial.save();

        return res.status(201).json({
            projectMaterial,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const removeProjectMaterialById = async (req, res) => {
    // #swagger.tags = ['Project_Materials']
    /* 
    #swagger.summary = 'Remove project-material'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        //TODO check for project_materials before deleting !!

        const { id } = req.params;

        const projectMaterial = await Project_Materials.findOne({
            where: { idMaterial: id }
        });

        await projectMaterial.destroy();
        return res.status(200).json({
            id,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllProjectMaterials,
    getProjectMaterialById,
    createProjectMaterial,
    updateProjectMaterial,
    removeProjectMaterialById,
    bulkUpdateProjectMaterial,
    getProjectsByMaterialId
}