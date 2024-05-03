import mongoose from 'mongoose'
const { Schema } = mongoose

const rackSchema = new Schema(
    {
        rak: { type: String, unique: true, required: true },
        kapasitas: { type: Number, required: true },
        // keterangan status integer
        // 1 = kosong (hijau) 2 = terisi (kuning) 3 = penuh (merah)
        terisi: { type: Number, required: true, default: 0 },
        status: { type: Number, required: true, default: 1 },
        produk: { type: String, unique: true }
    },
    { versionKey: false }
)

const Racks = mongoose.model('Rack', rackSchema)

export default Racks