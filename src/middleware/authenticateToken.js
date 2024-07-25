const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1]
		if (token == null) res.status(401).send('Unauthorized')
		jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
			if (err) next(new Error("invalid token"))
			req.userId = data.userId;
			next();
		});
	} catch (error) {
		res.status(403).send('Forbidden');
	}
}

module.exports = authenticateToken