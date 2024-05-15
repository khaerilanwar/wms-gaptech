import mongoose from 'mongoose'
const { Schema } = mongoose

const rackSchema = new Schema(
    {
        rak: { type: String, unique: true, required: true },
        kapasitas: { type: Number, required: true },
        // keterangan status integer
        // 0 = kosong (hijau)
        // 1 = terisi (kuning)
        // 2 = penuh (merah)
        terisi: { type: Number, required: true, default: 0 },
        produk: { type: String, unique: true, default: null }
    },
    { versionKey: false }
)

const Racks = mongoose.model('Rack', rackSchema)

export default Racks