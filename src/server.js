const express = require('express')
const app = express()
require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../swaggerSpec.js')

const router = require('./routes')
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api', router)

const port = process.env.PORT

app.listen(port, () => {
	console.log(`server has started on port ${port}`)
})
