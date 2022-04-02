const { Project_Materials } = require('../models');

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

const createProjectMaterial = async (req, res) => {
    // #swagger.tags = ['Project_Materials']
    /* 
    #swagger.summary = 'Creates a new project-material'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {

        const newProjectMaterial = await Project_Materials.create(req.body);

        return res.status(201).json({
            newProjectMaterial
        });

    } catch (error) {
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

        if (!mateprojectMaterialrial) {
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
    removeProjectMaterialById
}