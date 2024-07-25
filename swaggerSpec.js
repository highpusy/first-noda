const swaggerJSDoc = require('swagger-jsdoc')

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Твои методы API',
			version: '1.0.0',
			desription: 'API документация для приложения',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
					name: 'Authorization'
				}
			}
		}
	},
	apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec