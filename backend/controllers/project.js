const {Project} = require('../models');
const createProject = async (req, res) => {

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

module.exports = {
    createProject
}