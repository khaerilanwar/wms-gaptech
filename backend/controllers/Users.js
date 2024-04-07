import Users from "../models/UserModel.js";
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const register = async (req, res) => {
    const { name, email, password, confPassword } = req.body

    // if password and confirm is not same
    if (password !== confPassword) {
        return res.status(400).json({ msg: 'Password dan confirm password tidak cocok!' })
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10)
}