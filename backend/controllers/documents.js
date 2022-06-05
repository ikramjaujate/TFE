
const { Document, Project, Person, Company } = require('../models');
const nodemailer = require('nodemailer');
const { EMAIL, WORD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env;
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const redisClient = require("./redis");
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

        console.log(req.body)
        const buf = Buffer.from('Document not yet upload', 'utf8');

        let parameter = req.body
        parameter['file'] = buf
        const documents = await Document.create(parameter);

        return res.status(201).json({
            documents,
        });
    } catch (error) {
        console.log(error)
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

const getAllInvoices = async (req, res) => {
    // #swagger.tags = ['Documents']
    /* 
    #swagger.summary = 'Gets all the documents where type is invoice'
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
                    type: 'facture',
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
        
        const documents = await Document.findAll({
            where: { type: 'facture' },
            include : [{
                model: Project
            }]

        });

        if (documents) {
            return res.status(200).json({ documents });
        }
        return res.status(404).send('Document not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getAllQuotations = async (req, res) => {
    // #swagger.tags = ['Documents']
    /* 
    #swagger.summary = 'Gets all the documents where type is quotations'
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
        
        const documents = await Document.findAll({
            where: { type: 'devis' },
            include : [{
                model: Project
            }]

        });

        if (documents) {
            return res.status(200).json({ documents });
        }
        return res.status(404).send('Document not found');
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
        console.log(req.body.isAccepted)
        await document.save()
        
        const project = await Project.findOne({
            where: {
                idProject: document.idProject
            }
        });
        
        if (!project) {
            throw new Error("Project not found")
        };
        
        
        if(project.status == 'Pre-Sale' && req.body.isAccepted){
            await project.update(
                {
                    status: 'Accepted',
                }
            )
            await project.save()
            
        }
        if(project.status == 'Accepted' && !req.body.isAccepted){
            await project.update(
                {
                    status: 'Pre-Sale',
                }
            )
            await project.save()
            
        }
        let value = await redisClient.get('materials')
        if(value){
            
            await redisClient.del('materials')
        }

        await redisClient.setEx('materials-last-updated-at', 3600, new Date().toJSON())
     
        return res.status(200).json({ project });

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
        if (req.body.idPerson) {
            user = await Person.findOne({
                where: {
                    idPerson: req.body.idPerson
                }
            });
            displayName = `${user.firstName} ${user.lastName}`
            emailTo = `${user.email}`

        } else {
            user = await Company.findOne({
                where: {
                    idCompany: req.body.idCompany
                }
            });
            displayName = `${user.name}`
            emailTo = `${user.email}`
        }

        const oauth2Client = new OAuth2(
            OAUTH_CLIENTID,
            OAUTH_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground" // Redirect URL
        );
        oauth2Client.setCredentials({
            refresh_token: OAUTH_REFRESH_TOKEN
        });

        const accessToken = oauth2Client.getAccessToken()
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EMAIL,
                pass: WORD,
                clientId: OAUTH_CLIENTID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN,
                accessToken: accessToken
            },
        });
        
        transporter.verify((err, success) => {
            err
                ? console.log(err)
                : console.log(`=== Server is ready to take messages: ${success} ===`);
        });

        const mailOptions = {
            to: `${emailTo}`,
            subject: 'Quotation : ' + req.body.projectName,
            text: `Dear ${displayName}, 
            \n \n Following your request for a quote for project ${req.body.projectName}, please find attached our proposal. This proposal considers all the remarks made during the different meetings. 
            \n \n I would appreciate it if you would return this proposal with the mention "Accepted" followed by your signature and the date. 
             \n Before any acceptance, I remain of course at your entire disposal for any further information.
            \n \n Best regards,
             \n Master Services`,
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

        await document.update(
            {
                isEmailed: true

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
    getDocumentById,
    updateStateDocument,
    sendDocumentByEmail,
    getAllQuotations,
    getAllInvoices
}