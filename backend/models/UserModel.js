import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, lowercase: true },
        email: { type: String, unique: true, required: true, lowercase: true },
        password: { type: String, required: true },
        refreshToken: { type: String },
        resetpasswordlink: {data: String}
    },
    { versionKey: false }
)

const Users = mongoose.model('User', userSchema)

export default Users