const { Router } = require('express');
const verifyToken = require('../middleware/auth.js');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    getProjectByUserId
} = require('../controllers/person.js');
const router = Router();

//LOGIN
const { login } = require('../controllers/login.js');
router.post('/login', login)
// USERS
router.post('/users', verifyToken,createUser)
router.get('/users',verifyToken, getAllUsers)
router.get('/users/:id', verifyToken,getUserById)
router.patch('/users', verifyToken,updateUser)
router.get('/users/:id/projects', verifyToken,getProjectByUserId)

// COMPANY
const { getAllCompanies, 
    createCompany, 
    updateCompany, 
    getCompanyById, 
    getProjectByCompanyId
    
} = require('../controllers/company.js');
router.get('/company', verifyToken,getAllCompanies)
router.post('/company', verifyToken,createCompany)
router.put('/company', verifyToken,updateCompany)
router.get('/company/:id', verifyToken,getCompanyById)
router.get('/company/:id/projects', verifyToken,getProjectByCompanyId)

// ADDRESS
const {createAddress, getAllAddress} = require('../controllers/address.js');
router.get('/address', verifyToken,getAllAddress)
router.post('/address', verifyToken,createAddress)



// PROJECT
const { createProject, getAllProjects } = require('../controllers/project.js');
router.get('/projects',verifyToken,getAllProjects)
router.post('/projects',verifyToken,createProject)


// COUNTRY
const { getAllCountries} = require('../controllers/country.js');
router.get('/countries',verifyToken,getAllCountries)

module.exports = router