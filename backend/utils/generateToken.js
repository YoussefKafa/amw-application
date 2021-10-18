import jwt from 'jsonwebtoken'

const generateToken = (id,plugedNumber) => {
    return jwt.sign({ id,plugedNumber }, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
}

export default generateToken