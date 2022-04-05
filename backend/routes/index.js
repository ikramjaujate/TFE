const { Router } = require('express');
const verifyToken = require('../middleware/auth.js');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    getProjectByUserId,
    getSimpleUsersWithProjects
} = require('../controllers/person.js');
const router = Router();

//LOGIN
const { login } = require('../controllers/login.js');
router.post('/login', login)
// USERS
router.get('/simple-users', verifyToken, getSimpleUsersWithProjects)
router.get('/users', verifyToken, getAllUsers)
router.get('/users/:id', verifyToken, getUserById)
router.get('/users/:id/projects', verifyToken, getProjectByUserId)
router.post('/users', verifyToken, createUser)
router.patch('/users', verifyToken, updateUser)


// COMPANY
const { getAllCompanies,
    createCompany,
    updateCompany,
    getCompanyById,
    getProjectByCompanyId

} = require('../controllers/company.js');
router.get('/company', verifyToken, getAllCompanies)
router.get('/company/:id', verifyToken, getCompanyById)
router.get('/company/:id/projects', verifyToken, getProjectByCompanyId)
router.post('/company', verifyToken, createCompany)
router.put('/company', verifyToken, updateCompany)


// PROJECT
const { createProject,
    getAllProjects,
    updateProject,
    getProjectById,
    getDocumentsByProjectId,
    getPossiblesStatuses,
    getProjectMaterialByProjectId,
    getSimpleProject
} = require('../controllers/project.js');

router.get('/projects', verifyToken, getAllProjects)
router.get('/simple-project/:id', verifyToken, getSimpleProject)
router.get('/projects/:id', verifyToken, getProjectById)
router.get('/projects/:id/project-materials', verifyToken, getProjectMaterialByProjectId)
router.get('/projects/:id/documents', verifyToken, getDocumentsByProjectId)
router.get('/projects/:id/statuses', verifyToken, getPossiblesStatuses)
router.post('/projects', verifyToken, createProject)
router.patch('/projects', verifyToken, updateProject)

// DOCUMENTS
const {
    createDocuments,
    uploadPdfDocument,
    getAllDocuments,
    getDocumentById,
    updateStateDocument,
    sendDocumentByEmail
} = require('../controllers/documents.js');

router.get('/documents', verifyToken, getAllDocuments)
router.get('/documents/:id', verifyToken, getDocumentById)
router.post('/documents', verifyToken, createDocuments)
router.post('/sendDocument', verifyToken, sendDocumentByEmail)
router.patch('/documents/:id', verifyToken, updateStateDocument)
router.patch('/documents/:id/pdf', verifyToken, uploadPdfDocument)

// MATERIALS
const {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    removeMaterialById,
    getStockStatus
} = require('../controllers/material.js')

router.get('/materials', verifyToken, getAllMaterials);
router.get('/materials/:id', verifyToken, getMaterialById);
router.get('/stock-status', verifyToken, getStockStatus);
router.post('/materials', verifyToken, createMaterial);
router.patch('/materials', verifyToken, updateMaterial);
router.delete('/materials/:id', verifyToken, removeMaterialById);

// PROJECT-MATERIALS
const {
    getAllProjectMaterials,
    getProjectMaterialById,
    createProjectMaterial,
    updateProjectMaterial,
    removeProjectMaterialById,
    bulkUpdateProjectMaterial,
    getProjectsByMaterialId
} = require('../controllers/project-material.js')

router.get('/project-materials', verifyToken, getAllProjectMaterials);
router.get('/project-materials/:id', verifyToken, getProjectMaterialById);
router.get('/project-materials/:id/projects', verifyToken, getProjectsByMaterialId);
router.post('/project-materials', verifyToken, createProjectMaterial);
router.post('/bulk-project-materials', verifyToken, bulkUpdateProjectMaterial);
router.patch('/project-materials', verifyToken, updateProjectMaterial);
router.delete('/project-materials/:id', verifyToken, removeProjectMaterialById);

// ADDRESS
const { createAddress,
    getAllAddress
} = require('../controllers/address.js');
router.get('/address', verifyToken, getAllAddress)
router.post('/address', verifyToken, createAddress)

// COUNTRY
const { getAllCountries } = require('../controllers/country.js');

router.get('/countries', verifyToken, getAllCountries)



module.exports = router