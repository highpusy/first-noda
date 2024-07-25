const fs = require('fs')

class FileHelper {
	readFile (nameFile) {
		return new Promise((res, rej) => {
			fs.readFile(nameFile, 'utf8', (err, data) => {
				if (err) {
					console.log(err)
					rej(err)
				}
				res(JSON.parse(data))
				
			})
		})
	}

	writeFile (nameFile, data) {
		return new Promise((res, rej) => {
			fs.writeFile(nameFile, JSON.stringify(data, null, 2), (err, data) => {
				if (err) {
					console.error(err)
					rej(err)
				}
				res('yspex')
			})
		})
	}

	readFileByParam (nameFile, email) {
		return new Promise((res, rej) => {
			fs.readFile(nameFile, 'utf8', (err, data) => {
				if (err) {
					console.log(err)
					rej(err)
				}
				res(JSON.parse(data).find(item => item.email === email))
			})
		})
	}
}

module.exports = new FileHelper()