const { Router } = require('express');
const {verifyToken}= require('../middleware/auth.js');
const checkRoleAuth = require('../middleware/roleAuth.js');



const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getProjectByUserId,
    getSimpleUsersWithProjects
} = require('../controllers/person.js');
const router = Router();

//LOGIN
const { login } = require('../controllers/login.js');
router.post('/login', login)

//USER
const {
    getAllUsersLogin,
    createUserLogin,
    updateUserLogin,
    deleteUserLogin
    
} = require('../controllers/users.js')
router.get('/users', verifyToken, checkRoleAuth(['admin', 'dev']), getAllUsersLogin)
router.post('/users', verifyToken, checkRoleAuth(['admin', 'dev']),createUserLogin)
router.patch('/users', verifyToken, checkRoleAuth(['admin', 'dev']),updateUserLogin)
router.delete('/user/:id', verifyToken, checkRoleAuth(['admin', 'dev']),deleteUserLogin)
// PERSONS
router.get('/simple-persons', verifyToken,  checkRoleAuth(['admin', 'dev', 'sec']),getSimpleUsersWithProjects)
router.get('/persons', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']), getAllUsers)
router.get('/persons/:id',verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getUserById)
router.get('/persons/:id/projects', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getProjectByUserId)
router.post('/persons', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),createUser)
router.patch('/persons', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),updateUser)
router.delete('/persons', verifyToken, checkRoleAuth(['admin', 'dev']),deleteUser)

// COMPANY
const { getAllCompanies,
    createCompany,
    updateCompany,
    getCompanyById,
    getProjectByCompanyId,
    deleteCompany

} = require('../controllers/company.js');
router.get('/company', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getAllCompanies)
router.get('/company/:id', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getCompanyById)
router.get('/company/:id/projects', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getProjectByCompanyId)
router.post('/company', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),createCompany)
router.patch('/company', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),updateCompany)
router.delete('/company', verifyToken, checkRoleAuth(['admin', 'dev']),deleteCompany)

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

router.get('/projects', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getAllProjects)
router.get('/simple-project/:id', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getSimpleProject)
router.get('/projects/:id', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getProjectById)
router.get('/projects/:id/project-materials', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getProjectMaterialByProjectId)
router.get('/projects/:id/documents', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getDocumentsByProjectId)
router.get('/projects/:id/statuses', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getPossiblesStatuses)
router.post('/projects', verifyToken, checkRoleAuth(['admin', 'dev']),createProject)
router.patch('/projects', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),updateProject)

// DOCUMENTS
const {
    createDocuments,
    uploadPdfDocument,
    getAllDocuments,
    getDocumentById,
    updateStateDocument,
    sendDocumentByEmail,
    getAllQuotations,
    getAllInvoices
} = require('../controllers/documents.js');

router.get('/documents', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), getAllDocuments)
router.get('/documents/:id', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), getDocumentById)
router.get('/quotations', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), getAllQuotations)
router.get('/invoices', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), getAllInvoices)
router.post('/documents', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),createDocuments)
router.post('/sendDocument', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),sendDocumentByEmail)
router.patch('/documents/:id', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),updateStateDocument)
router.patch('/documents/:id/pdf', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), uploadPdfDocument)


// MATERIALS
const {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    removeMaterialById,
    getStockStatus,
    getDataWasUpdated,
    getMaterialChanges
} = require('../controllers/material.js')

router.get('/materials', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getAllMaterials);
router.get('/materials/last-updated-at', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getDataWasUpdated)
router.get('/materials/stock-status', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), getStockStatus);
router.get('/material-history/:id', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), getMaterialChanges)
router.get('/materials/:id', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getMaterialById);
router.post('/materials', verifyToken,checkRoleAuth(['admin', 'dev']), createMaterial);
router.patch('/materials', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),updateMaterial);
router.delete('/materials/:id', verifyToken, checkRoleAuth(['admin', 'dev']),removeMaterialById);

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

router.get('/project-materials', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getAllProjectMaterials);
router.get('/project-materials/:id', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getProjectMaterialById);
router.get('/project-materials/:id/projects', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getProjectsByMaterialId);
router.post('/project-materials', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), createProjectMaterial);
router.post('/bulk-project-materials', verifyToken,checkRoleAuth(['admin', 'dev', 'sec']), bulkUpdateProjectMaterial);
router.patch('/project-materials', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),updateProjectMaterial);
router.delete('/project-materials/:id', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),removeProjectMaterialById);

// ADDRESS
const { 
    createAddress,
    getAllAddress
} = require('../controllers/address.js');
router.get('/address', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getAllAddress)
router.post('/address', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),createAddress)

// COUNTRY
const { getAllCountries } = require('../controllers/country.js');

router.get('/countries', verifyToken, checkRoleAuth(['admin', 'dev', 'sec']),getAllCountries)



module.exports = router