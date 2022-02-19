const { Router } = require('express');
const verifyToken = require('../middleware/auth.js');
const {
    createUser,
    getAllUsers,
    getUserById
} = require('../controllers/users.js');
const router = Router();

// Routes
router.get('/', (req, res) => res.send('This is root!'))

// USERS
router.post('/users/create', verifyToken,createUser)
router.get('/users', verifyToken,getAllUsers)
router.get('/users/:id', verifyToken,getUserById)

// COMPANY
const { getAllCompanies} = require('../controllers/company.js');
router.get('/company', verifyToken,getAllCompanies)

// ADDRESS
const {createAddress, getAllAddress} = require('../controllers/address.js');
router.get('/address', verifyToken,getAllAddress)
router.post('/address/create', verifyToken,createAddress)

//LOGIN
const { login } = require('../controllers/login.js');
router.post('/login', login)

module.exports = router