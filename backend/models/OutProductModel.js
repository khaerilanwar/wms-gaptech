import mongoose from 'mongoose'
const { Schema } = mongoose

const outProductSchema = new Schema(
    {
        kodeProduk: { type: Number, unique: false, required: true },
        namaProduk: { type: String, required: true },
        stokKeluar: { type: Number, required: true },
        dateOutProduct: { type: Date, default: Date.now() }
    },
    { versionKey: false }
)

const OutProducts = mongoose.model('OutProduct', outProductSchema)

export default OutProducts