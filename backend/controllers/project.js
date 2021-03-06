const { Project, Person, Company, Address, Country, Document, Project_Materials, Material, Materials_Update, userLogin } = require('../models');
const { projectTypes } = require('../consts/projectTypes')
const redisClient = require("./redis");
const jwt_decode = require('jwt-decode');

const createProject = async (req, res) => {
    // #swagger.tags = ['Project']
    /* 
    #swagger.summary = 'Create new project'
    #swagger.description = 'Create new project linked to a client'
    #swagger.security = [{
               "bearerAuth": []
    }]
    #swagger.responses[200] = {
            description: 'New project created.',
            schema:
            { "project" : [
                {
                    name: 'Façade',
                    idPerson: 1,
                    status: 'Accepted',
                    "createdAt": "2022-02-13T12:37:54.635Z",
                    "updatedAt": "2022-02-13T12:37:54.635Z"
                }
            ]
        }
    }
    
    */

    try {

        const project = await Project.create(req.body);

        return res.status(201).json({
            project,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getProjectById = async (req, res) => {
    // #swagger.tags = ['Project']
    /* 
    #swagger.summary = 'Gets a project by ID'
    #swagger.description = 'Numeric ID of the project to get.'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.parameters['id'] = {
                in: 'path',
                description: 'Project ID.',
                required: true,
                type: 'integer'
            }
    */
    try {
        const { id } = req.params;

        const project = await Project.findAll({
            where: { idProject: id },
            include: [{
                model: Person, include: [{ model: Address, include: [Country] }]
            },
            {
                model: Company, include: [{ model: Address, include: [Country] }]
            }]
        });

        if (project) {
            return res.status(200).json({ project });
        }
        return res.status(404).send('Project with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getSimpleProject = async (req, res) => {
    // #swagger.tags = ['Project']
    /* 
    #swagger.summary = 'Gets a project by ID'
    #swagger.description = 'Numeric ID of the project to get.'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.parameters['id'] = {
                in: 'path',
                description: 'Project ID.',
                required: true,
                type: 'integer'
            }
    */
    try {
        const { id } = req.params;

        const project = await Project.findOne({
            where: { idProject: id },

            attributes: ['idProject', 'status']
        });

        if (project) {
            return res.status(200).json({ project });
        }
        return res.status(404).send('Project with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const getAllProjects = async (req, res) => {
    // #swagger.tags = ['Project']
    /* 
    #swagger.summary = 'Get all projects'
    #swagger.description = 'Get all the projects without using ID'
    #swagger.security = [{
               "bearerAuth": []
    }]
    #swagger.responses[200] = {
            description: 'Projects successfully obtained.',
            schema:
            { "project" : [
                {
                    name: 'Façade',
                    idPerson: 1,
                    status: 'Accepted',
                    "createdAt": "2022-02-13T12:37:54.635Z",
                    "updatedAt": "2022-02-13T12:37:54.635Z"
                }
            ]
        }
    }
    
    */
    try {
        const projects = await Project.findAll({
            include: [{
                model: Person
            },
            {
                model: Company
            }]
        });

        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).send(error.message);
    }

}
const getDocumentsByProjectId = async (req, res) => {
    // #swagger.tags = ['Project']
    /* 
    #swagger.summary = 'Gets the documents using the project ID'
    #swagger.description = 'Numeric ID of the project to get.'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.parameters['id'] = {
                in: 'path',
                description: 'Project ID.',
                required: true,
                type: 'integer'
            }
    */
    try {
        const { id } = req.params;
        const project = await Document.findAll({

            include: [{
                model: Project, where: { idProject: id },
            }]
        });


        if (project) {
            return res.status(200).json({ project });
        }
        return res.status(404).send('Project with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateProject = async (req, res) => {
    // #swagger.tags = ['Project']
    /* 
    #swagger.summary = 'Update project'
    #swagger.description = 'Updating a project .'
    #swagger.security = [{
               "bearerAuth": []
    }] 

    */
    try {

        validateUpdateBody(req.body)

        const project = await Project.findOne({
            where: {
                idProject: req.body.id
            }
        });


        if (!project) {
            throw new Error("Project not found")
        };

        if (project.status == "Accepted" && req.body.status == "Pre-Sale") {
            const documents = await Document.findAll({
                where: {
                    idProject: req.body.id, type: 'devis'
                }
            });

            documents.forEach(doc => {

                doc.isAccepted = false
            });

            await Document.bulkCreate(JSON.parse(JSON.stringify(documents)), { updateOnDuplicate: ['isAccepted'] })

        }

        await project.update(
            {
                name: req.body.name,
                status: req.body.status,
                start_date: req.body.start_date,
                end_date: req.body.end_date

            }

        )
        await project.save()
        //TODO: SI PROJET PASSE A UN ETAT DONE, MISE A JOUR DU MATERIAL
        
        if (project.status == "Done") {
            const token = req.header('Authorization').split("Bearer")[1].trim();
            const decode = jwt_decode(token).user_id
            
            const user =  await userLogin.findOne({
                where: {
                    email: decode
                }
            });
            
            const materials = await Project_Materials.findAll({
                where: {
                    idProject: req.body.id
                }
            });
            
            materials.forEach(async(mat) => {
                console.log(mat)
                let material = await Material.findOne({
                    where: {
                        idMaterial: mat.idMaterial
                    }
                    
                })
                let newQuantity = material.quantity - mat.quantity

                await Materials_Update.create({
                    idMaterial: mat.idMaterial,
                    idUserLogin: user.idUserLogin,
                    reason: 'project',
                    notes: 'Project reason',
                    quantity: 0 - mat.quantity
                });

                await material.update(
                    {
                        quantity: newQuantity
                    }
                )

                await material.save()
                redisClient.del('materials')

                
            });
        }

        return res.status(200).json({ project });
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message);
    }
}

const getPossiblesStatuses = async (req, res) => {
    // #swagger.tags = ['Project']
    /* 
    #swagger.summary = 'Get all possible statuses for a project'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {

        const documents = await Document.findAll({
            where: { idProject: req.params.id }
        });
        const project = await Project.findOne({
            where: { idProject: req.params.id }
        })

        if(project && project.status == "Closed"){
            return res.status(200).json({ 'types': [...projectTypes.slice(-2,-1)] });
        }

        if (!documents) {
            return res.status(200).json({ 'types': [...projectTypes.slice(0, 2), ...projectTypes.slice(-1)] });
        }
        const paidInvoices = documents.filter(doc => {
            return (doc.type == 'facture' && doc.isPaid)
        })

        if (paidInvoices.length) {

            console.log('paidInvoices')
            
            return res.status(200).json({ 'types': [...projectTypes.slice(-3, -1)] });
        }

        const unPaidInvoices = documents.filter(doc => {

            return (doc.type == 'facture' && !doc.isPaid)
        })

        if (unPaidInvoices.length) {
            console.log('unPaidInvoices')
            
            return res.status(200).json({ 'types': [...projectTypes.slice(-4, -2)] });
        }

        const acceptedQuote = documents.filter(doc => {
            return (doc.type == 'devis' && doc.isAccepted)
        })
       
        if (acceptedQuote.length) {
            console.log('acceptedQuote')

            if(project && project.status == "In Progress"){
                return res.status(200).json({ 'types': [...projectTypes.slice(0, 3)] });
            }

            return res.status(200).json({ 'types': [...projectTypes.slice(0, 3), ...projectTypes.slice(-1)] });
        }

        return res.status(200).json({ 'types': [...projectTypes.slice(0, 1), ...projectTypes.slice(-1)] });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getProjectMaterialByProjectId = async (req, res) => {
    // #swagger.tags = ['Project']
    /* 
    #swagger.summary = 'Get all project-materials by project id'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { id } = req.params;

        const project = await Project.findOne({
            where: { idProject: id }
        });

        if (!project) {
            throw new Error("Project not found")
        }

        const projectMaterials = await Project_Materials.findAll({
            where: { idProject: id }, include: [{
                model: Material
            }]
        });

        if (projectMaterials) {
            return res.status(200).json({ projectMaterials });
        }
        return res.status(404).send('Project with the specified ID does not exist');
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

function validateUpdateBody(body) {
    if(!body) return false;
    if (!body.id) {
        
        throw new Error('No project id')
    }
    if (!body.name || body.name == "") {
        throw new Error('No name')
    }

    if (!body.status || !(projectTypes.find(s => { return s == body.status }))) {
        throw new Error('No status or invalid status')
    }
    if (!body.start_date) {
        throw new Error('No start date')
    }
    if (!body.end_date) {
        throw new Error('No end date')
    }
    if (new Date(body.start_date) > new Date(body.end_date)) {
        throw new Error('Invalid date')
    }
    return true
}

module.exports = {
    createProject,
    getAllProjects,
    updateProject,
    getDocumentsByProjectId,
    getProjectById,
    getPossiblesStatuses,
    getProjectMaterialByProjectId,
    getSimpleProject,
    validateUpdateBody
}