import { mongoose } from 'mongoose'

const uri = 'mongodb://127.0.0.1:27017/devwms'
export default mongoose.connect(uri)