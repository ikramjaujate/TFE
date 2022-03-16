
const { Document, Project } = require('../models');
const Buffer = require('buffer').Buffer;

const createDocuments = async (req, res) => {
    // #swagger.tags = ['Documents']
    /* 
    #swagger.summary = 'Create new quotation'
    #swagger.description = 'Create new quotation linked to a project'
    #swagger.security = [{
               "bearerAuth": []
    }]
    #swagger.responses[201] = {
            description: 'New quotation created.',
            schema:
            { "document" : [
                {
                    "file": {
                    "type": "Buffer",
                    "data": [37, 80, 68, 70]},
                    idProject: 1,
                    type: 'devis',
                    notes: '/',
                    isPaid: false,
                    isAccepted: false,
                    "createdAt": "2022-02-13T12:37:54.635Z",
                    "updatedAt": "2022-02-13T12:37:54.635Z"
                }
            ]
        }
    }
    
    */


    try {

        const buf = Buffer.from('hello world', 'utf8');

        let parameter = req.body
        parameter['idProject'] = Number(req.params.id)
        parameter['file'] = buf

        const documents = await Document.create(parameter);

        return res.status(201).json({
            documents,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllDocuments = async (req, res) => {
    // #swagger.tags = ['Documents']
    /* 
    #swagger.summary = 'Get all documents'
    #swagger.security = [{
               "bearerAuth": []
    }] */
    
    try {
        const documents = await Document.findAll({include : {
            model : Project
        }});

        return res.status(200).json({ documents });
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}

const getDocumentById = async (req, res) => {
    // #swagger.tags = ['Documents']
    /* 
    #swagger.summary = 'Gets documents using id'
    #swagger.description = 'Numeric ID of the document to get.'
    #swagger.security = [{
               "bearerAuth": []
    }] 
    #swagger.parameters['id'] = {
                in: 'path',
                description: 'Document ID.',
                required: true,
                type: 'integer'
            }
    #swagger.responses[200] = {
            description: 'The document to get.',
            schema:
            { "document" : [
                {
                    "file": {
                    "type": "Buffer",
                    "data": [37, 80, 68, 70]},
                    idProject: 1,
                    type: 'devis',
                    notes: '/',
                    isPaid: false,
                    isAccepted: false,
                    "createdAt": "2022-02-13T12:37:54.635Z",
                    "updatedAt": "2022-02-13T12:37:54.635Z"
                }
            ]
        }
    }
    */
    try {
        const { id } = req.params;

        const document = await Document.findAll({
            where: {idDocument: id},
            
        });
        
        if (document) {
            return res.status(200).json({ document });
        }
        return res.status(404).send('Document with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const uploadPdfDocument = async (req, res) => {
    // #swagger.tags = ['Documents']
    /* 
    #swagger.summary = 'Update document file'
    #swagger.description = 'Update document file linked to a document'
    #swagger.security = [{
               "bearerAuth": []
    }]
    #swagger.responses[201] = {
            description: 'Document to update',
            schema:
            { "documents" : [
                {
                    "file": {
                    "type": "Buffer",
                    "data": [37, 80, 68, 70]},
                    idProject: 1,
                    type: 'devis',
                    notes: '/',
                    isPaid: false,
                    isAccepted: false,
                    "createdAt": "2022-02-13T12:37:54.635Z",
                    "updatedAt": "2022-02-13T12:37:54.635Z"
                }
            ]
        }
    }
    
    */

    try {

        validateUpdateBody(req.body)
        console.log(req.body)
        const document = await Document.findOne({
            where: {
                idDocument: req.params.id
            }
        });
        if (!document) {
            throw new Error("No document")
        };
        await document.update(
            {
                file: req.body

            }

        )
        await document.save()

        return res.status(200).json({ document });



    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}



function validateUpdateBody(body) {
    if (!body) {
        throw new Error('No document id')
    }

}


module.exports = {
    createDocuments,
    uploadPdfDocument,
    getAllDocuments,
    getDocumentById
}