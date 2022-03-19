
const { Document, Project, Person, Company } = require('../models');
const nodemailer = require('nodemailer');
const { EMAIL, WORD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env;

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
        const documents = await Document.findAll({
            include: {
                model: Project
            }
        });

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
            where: { idDocument: id },

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

const updateStateDocument = async (req, res) => {
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
                isPaid: req.body.isPaid,
                isAccepted: req.body.isAccepted

            }

        )
        await document.save()

        return res.status(200).json({ document });



    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const sendDocumentByEmail = async (req, res) => {
    // #swagger.tags = ['Documents']
    /* 
    #swagger.summary = 'Send document'
    #swagger.description = 'Send document linked to a project'
    #swagger.security = [{
               "bearerAuth": []
    }]*/
    try {
        
        const document = await Document.findOne({
            where: {
                idDocument: req.body.idDocument
            }
        });
        let user = []
        let displayName = ''
        let emailTo = ''
        if(req.body.idPerson){
             user = await Person.findOne({
                where: {
                    idPerson: req.body.idPerson
                }
            });
            displayName = `${user.firstName} ${user.lastName}`
            emailTo =  `${user.email}`
           
        }else{
            user = await Company.findOne({
                where: {
                    idCompany: req.body.idCompany
                }
            });
            displayName = `${user.name}`
            emailTo =  `${user.email}`
        }
        
       
       
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EMAIL,
                pass: WORD,
                clientId: OAUTH_CLIENTID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN
            },
        });
        transporter.verify((err, success) => {
            err
                ? console.log(err)
                : console.log(`=== Server is ready to take messages: ${success} ===`);
        });

        const mailOptions = {
            to: `${emailTo}`,
            subject: 'Quotation : ' + req.body.projectName ,
            text: `Dear ${displayName}, \n \n You will in attachement the requested quote of your project. \n \n Kind regards, \n Master Services`,
            attachments: [
                {   
                    filename: `quote-${displayName.replace(' ', '_')}-${req.body.createdAt}.pdf`,
                    content: document.file
                }
            ]
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent successfully");
            }
        });
        return res.status(201).json({ toto: 'toto' })
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
    getDocumentById,
    updateStateDocument,
    sendDocumentByEmail
}