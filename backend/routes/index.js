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

/** 
 *  @swagger
 *  /api/users/create:
 *    post:
 *      tags : ["Users"]
 *      summary: Creates a new user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create.
 *          schema:
 *            type: object
 *            required:
 *              - userName
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              VAT_num:
 *                type: integer
 *              mobile:
 *                type: string
 *      responses:
 *        
 *        201:
 *          description: New user created
 *        401: 
 *          description: Unauthorized 
 *        404: 
 *          description: Not found 
 *        500:
 *          description: Server internal error
*/
router.post('/users/create', verifyToken,createUser)

/**
 * @swagger
 * /api/users:
 *    get:
 *      tags : ["Users"]
 *      summary: Get all users.
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: OK
 *        401: 
 *          description: Unauthorized 
 *        404: 
 *          description: Not found 
 *        500:
 *          description: Server internal error
 */
router.get('/users', verifyToken,getAllUsers)

/**
 * @swagger
 * /api/users/{id}:
 *    get:
 *      tags : ["Users"]
 *      summary: Gets a user by ID.
 *      consumes:
 *        - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: Numeric ID of the user to get.
 *      responses:
 *        200:
 *          description: OK
 *        401: 
 *          description: Unauthorized 
 *        404: 
 *          description: Not found 
 *        500:
 *          description: Server internal error
 */
router.get('/users/:id', verifyToken,getUserById)

const { getAllCompanies} = require('../controllers/company.js');
/**
 * @swagger
 * /api/company:
 *    get:
 *      tags : ["Company"]
 *      summary: Get all companies.
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: OK
 *        401: 
 *          description: Unauthorized 
 *        404: 
 *          description: Not found 
 *        500:
 *          description: Server internal error
 */
router.get('/company', verifyToken,getAllCompanies)

const {createAddress, getAllAddress} = require('../controllers/address.js');

/**
 * @swagger
 * /api/address:
 *    get:
 *      tags : ["Address"]
 *      summary: Get all adresses.
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: OK
 *        401: 
 *          description: Unauthorized 
 *        404: 
 *          description: Not found 
 *        500:
 *          description: Server internal error
 */
router.get('/address', verifyToken,getAllAddress)
/** 
 *  @swagger
 *  /api/address/create:
 *    post:
 *      tags : ["Address"]
 *      summary: Creates a new address.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The address to create.
 *          schema:
 *            type: object
 *            required:
 *              - address
 *            properties:
 *              street:
 *                type: string
 *              locality:
 *                type: string
 *              postal_code:
 *                type: string
 *      responses:
 *        201:
 *          description: New address created
 *        401: 
 *          description: Unauthorized 
 *        404: 
 *          description: Not found 
 *        500:
 *          description: Server internal error
*/
router.post('/address/create', verifyToken,createAddress)

const { login } = require('../controllers/login.js');

/** 
 *  @swagger
 *  /api/login:
 *    post:
 *      tags : ["Login"]
 *      summary: Get JWT Token
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The address to create.
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: New address created
 *        404: 
 *          description: Not found 
 *        500:
 *          description: Server internal error
*/
router.post('/login', login)

module.exports = router