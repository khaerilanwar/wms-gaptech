import OutProducts from "../models/OutProductModel.js";
import Products from "../models/ProductModel.js";
import Transaction from "../models/TransactionModel.js";

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ tanggalTransaksi: -1 })
        res.json(transactions)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const getTransaction = async (req, res) => {
    if (!req.params.idTransaksi) return res.status(400).json({ msg: "Id transaksi tidak dikirim" })
    try {
        const transaction = await Transaction.findOne({ idTransaksi: req.params.idTransaksi }, { _id: 0 })
        res.json(transaction)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const saveTransaction = async (req, res) => {
    const allProduct = await Products.find()
    try {
        // Alur menambahkan transaksi baru ke dalam database
        const barangKeluar = []
        const totalHarga = []
        for (const item of req.body.barangKeluar) {
            let outProduct = allProduct.find(produk => produk.kodeProduk == item.kodeProduk)
            if (!outProduct) return res.status(404).json({ msg: `Kode produk ${item.kodeProduk} tidak ditemukan` })
            outProduct = {
                kodeProduk: outProduct.kodeProduk,
                namaProduk: outProduct.namaProduk,
                kuantitas: item.kuantitas,
                hargaSatuan: outProduct.harga,
                subTotal: outProduct.harga * item.kuantitas
            }
            totalHarga.push(outProduct.subTotal)
            barangKeluar.push(outProduct)
        }

        const current = new Date()
        const newTransaction = {
            idTransaksi: `${current.getFullYear()}${String(current.getMonth() + 1).padStart(2, '0')}${String(current.getDate()).padStart(2, '0')}${Math.floor(1000 + Math.random() * 9000)}`,
            namaPemesan: req.body.namaPemesan,
            alamatPengiriman: req.body.alamatPengiriman,
            barangKeluar,
            totalHarga: totalHarga.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }
        // Menambahkan data transaksi baru ke database
        await Transaction.create(newTransaction)

        // Mengurangi stok dan menambahkan data barang keluar di database
        for (const itemBarangKeluar of barangKeluar) {
            // Mengurangi stok barang
            await Products.updateOne(
                { kodeProduk: itemBarangKeluar.kodeProduk },
                { $inc: { stok: -itemBarangKeluar.kuantitas } })

            // Menambahkan data barang keluar
            await OutProducts.create({
                kodeProduk: itemBarangKeluar.kodeProduk,
                namaProduk: itemBarangKeluar.namaProduk,
                stokKeluar: itemBarangKeluar.kuantitas,
                dateOutProduct: new Date()
            })
        }

        res.status(201).json({ msg: "Transaksi baru berhasil ditambahkan!" })
    } catch (error) {
        res.sendStatus(400)
    }
}