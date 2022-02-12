const { Router } = require('express');
const {
    createUser,
    getAllUsers,
    getUserById
} = require('../controllers/users.js');
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))
router.post('/users', createUser)
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)

const { getAllCompanies} = require('../controllers/company.js');
router.get('/company', getAllCompanies)

module.exports = router