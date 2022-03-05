const { Router } = require('express');
const verifyToken = require('../middleware/auth.js');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser
} = require('../controllers/person.js');
const router = Router();

// Routes
router.get('/', (req, res) => res.send('This is root!'))

// USERS
router.post('/users', verifyToken,createUser)
router.get('/users',verifyToken, getAllUsers)
router.get('/users/:id', verifyToken,getUserById)
router.put('/users', verifyToken,updateUser)

// COMPANY
const { getAllCompanies} = require('../controllers/company.js');
router.get('/company', verifyToken,getAllCompanies)

// ADDRESS
const {createAddress, getAllAddress} = require('../controllers/address.js');
router.get('/address', verifyToken,getAllAddress)
router.post('/address', verifyToken,createAddress)

//LOGIN
const { login } = require('../controllers/login.js');
router.post('/login', login)

// PROJECT
const { createProject } = require('../controllers/project.js');
router.post('/project',verifyToken,createProject)

// COUNTRY
const { getAllCountries} = require('../controllers/country.js');
router.get('/countries',verifyToken,getAllCountries)

module.exports = router