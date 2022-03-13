const { Project, Person, Company } = require('../models');
const {projectTypes} = require('../consts/projectTypes')

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
        console.log(req.body)
        const project = await Project.create(req.body);

        return res.status(201).json({
            project,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
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

        
        await project.update(
            {
                name: req.body.name,
                status: req.body.status,
                start_date : req.body.start_date,
                end_date : req.body.end_date

            }

        )
        await project.save()

        return res.status(200).json({ project });
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message);
    }
}

function validateUpdateBody(body){
    if(!body.id){
        throw new Error ('No project id')
    }
    if(!body.name || body.name == ""){
        throw new Error ('No name')
    }

    if(!body.status || !(projectTypes.find(s => {return s == body.status}))){
        throw new Error ('No status or invalide status')
    }
    if(!body.start_date){
        throw new Error ('No start date')
    }
    if(!body.end_date){
        throw new Error ('No end date')
    }
    if(new Date(body.start_date) > new Date(body.end_date) ){
        throw new Error ('Invalide date')
    }
}

module.exports = {
    createProject,
    getAllProjects,
    updateProject
}