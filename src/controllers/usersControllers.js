const UsersServices = require('../services/userServices')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UsersControllers {
	async getUsers (req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const result = await UsersServices.getUsers(req.params)
		res.send(result)
	}

	async createUser (req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

		const result = await UsersServices.createUser({
			id:uuidv4(), 
			...req.body, 
			password: hashedPassword
		})
		res.send(result)
	}

	async login (req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body
		const user = await UsersServices.getUserByEmail(email)
		if (!user) {
			return res.status(401).json({ message: 'неверный имейл или пароль' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'неверный имейл или пароль' })
		}

		const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY)

		res.send({ token })

	}
}

module.exports = new UsersControllers()