const FileHelper = require('../helpers/fileHelper')

class UsersServices{
	#users = []
	getUsers ({ email }) {
		return FileHelper.readFile('data.json')
	}
	async createUser (body) {
		const result = await FileHelper.readFile('data.json')
		result.push(body)
		return await FileHelper.writeFile('data.json', result)
	}

	getUserByEmail (email) {
		return FileHelper.readFileByParam('data.json', email)
	}
}

module.exports = new UsersServices()