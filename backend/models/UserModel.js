import { mongoose } from 'mongoose'

const Users = mongoose.model('User', {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    accessToken: { type: String }
})

export default Users