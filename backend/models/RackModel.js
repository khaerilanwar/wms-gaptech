import mongoose from 'mongoose'
const { Schema } = mongoose

const rackSchema = new Schema(
    {
        rak: { type: String, unique: true, required: true },
        kapasitas: { type: Number, required: true }
        // kodeProduk: { type: Number, unique: true, required: true, minlength: 13, maxlength: 13 },
        // namaProduk: { type: String, required: true },
        // harga: { type: Number, required: true },
        // stok: { type: Number, required: true },
        // posisiRak: { type: String, required: true },
        // createdAt: { type: Date, default: Date.now() },
        // updatedAt: { type: Date, default: Date.now() }
    },
    { versionKey: false }
)

const Racks = mongoose.model('Product', rackSchema)

export default Racks