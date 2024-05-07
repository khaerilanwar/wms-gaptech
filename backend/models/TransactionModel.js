import mongoose from 'mongoose'
const { Schema } = mongoose

const transactionSchema = new Schema(
    {
        idTransaksi: { type: Number, unique: true, required: true },
        namaPemesan: { type: String, required: true },
        alamatPengiriman: { type: String, required: true },
        barangKeluar: { type: Array, required: true },
        totalHarga: { type: Number, required: true },
        status: { type: Number, required: true, default: 0 },
        tanggalTransaksi: { type: Date, default: Date.now() },
        terakhirDiubah: { type: Date, default: Date.now() }
    },
    { versionKey: false }
)

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction