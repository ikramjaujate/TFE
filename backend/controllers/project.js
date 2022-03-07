const { Project, Person, Company } = require('../models');
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
            include: {
                model: Person, Company
            }
        });
        console.log('==========================')
        console.log(projects)
        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

module.exports = {
    createProject,
    getAllProjects
}