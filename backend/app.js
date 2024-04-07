import mongoose from 'mongoose'
import express from 'express'
import router from './routes/index.js'
const app = express()

// connected to mongodb database
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/devwms')
    console.log('Database connected')
} catch (error) {
    console.log(error)
}

app.use(express.json())
app.use(router)

app.listen(5000, () => console.log('Server running in http://localhost:5000'))