const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const jwt = require('jsonwebtoken');


const UsersControllers = require('../controllers/usersControllers')
const authenticateToken = require('../middleware/authenticateToken')

const validateData = [
	body('email').isEmail().withMessage('твой парол говно'),
	body('password').isLength({ min: 3 }).withMessage('инвалид пасворд отьебись')
]


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: получить пользователей
 *     description: Получение списка тасок из базы данных с возможностью сортировки.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Массив тасок
 */

router.get('/', authenticateToken, UsersControllers.getUsers)


/**
 * @swagger
 * /api/users/register:
 *    post:
 *      summary: register new user
 *      description: Любое описание...
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Таска успешно создана
 * components:
 *   requestBodies:
 *     Users:
 *       description: Свойства таски, которые были добавлены.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *                 description: users email
 *               password:
 *                 type: string
 *                 example: 12345
 *                 description: users password
 */

router.post('/register', validateData, UsersControllers.createUser)


/**
 * @swagger
 * /api/users/login:
 *    post:
 *      summary: login user
 *      description: Любое описание...
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Таска успешно создана
 * components:
 *   requestBodies:
 *     Users:
 *       description: Свойства таски, которые были добавлены.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *                 description: users email
 *               password:
 *                 type: string
 *                 example: 12345
 *                 description: users password
 */


router.post('/login', validateData, UsersControllers.login)

module.exports = router