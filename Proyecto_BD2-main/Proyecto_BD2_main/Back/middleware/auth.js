const jwt = require('jsonwebtoken')

const auth = () => {
    return async (req, res, next) => {
        try {
            console.log("ESTOY EN EL JWT VERIFY")
            const token = req.header('Authorization').replace('Bearer ', '')
            jwt.verify(token, process.env.JWT_SECRET)
            next()
        } catch (e) {
            console.log(e)
            res.status(401).send({ error: 'Falta autenticación.' })
        }
    }
}

module.exports = auth