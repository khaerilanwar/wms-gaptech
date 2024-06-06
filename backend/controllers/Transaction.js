import OutProducts from "../models/OutProductModel.js";
import Products from "../models/ProductModel.js";
import Racks from "../models/RackModel.js";
import Transaction from "../models/TransactionModel.js";

// for get all data transaction
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}, { _id: 0 }).sort({ tanggalTransaksi: -1 })
        res.json(transactions)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// untuk mendapatkan data transaksi yang statusnya masih on proses
export const getProcessTransactions = async (req, res) => {
    try {
        const processTransactions = await Transaction.find({ status: 0 }, { _id: 0 }).sort({ tanggalTransaksi: -1 })
        res.json(processTransactions)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

export const getSuccessTransactions = async (req, res) => {
    try {
        const successTransations = await Transaction.find({ status: 1 }, { _id: 0 }).sort({ tanggalTransaksi: -1 })
        res.json(successTransations)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// get success transaction by period
export const getSuccessTransactionsByPeriod = async (req, res) => {
    try {
        const periodData = await Transaction.find(
            {
                status: 1,
                tanggalTransaksi: {
                    $gte: new Date(req.query.start),
                    $lt: new Date(req.query.end).setHours(23, 59, 59, 999)
                }
            },
            { _id: 0 }
        ).sort({ tanggalTransaksi: 1 })

        res.json(periodData)
    } catch (error) {
        res.sendStatus(400)
    }
}

// get success transaction 30 last days
export const getSuccessTransactionsLast30Days = async (req, res) => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)

    try {
        const lastMonthData = await Transaction.find(
            {
                status: 1,
                tanggalTransaksi: {
                    $gte: startDate,
                    $lt: new Date()
                }
            }, { _id: 0 }
        ).sort({ tanggalTransaksi: 1 })

        res.json(lastMonthData)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

// for get a transaction data
export const getTransaction = async (req, res) => {
    if (!req.params.idTransaksi) return res.status(400).json({ msg: "Id transaksi tidak dikirim" })
    try {
        const transaction = await Transaction.findOne({ idTransaksi: req.params.idTransaksi }, { _id: 0 })
        if (!transaction) return res.status(404).json({ msg: "ID Transaksi tidak ditemukan!" })
        res.json(transaction)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// Mendapatkan detil transaksi berdasarkan id secara publik
export const getTransactionPublic = async (req, res) => {
    if (!req.params.idTransaksi) return res.status(400).json({ msg: "Id transaksi tidak dikirim" })
    try {
        const transaction = await Transaction.findOne({ idTransaksi: req.params.idTransaksi, status: 0 }, { _id: 0 })
        if (!transaction) return res.status(404).json({ msg: "ID Transaksi tidak ditemukan!" })
        res.json(transaction)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// untuk menambah transaksi baru
export const saveTransaction = async (req, res) => {
    const allProduct = await Products.find()
    try {
        // Alur menambahkan transaksi baru ke dalam database
        // Menampung data barang masuk ke array
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

        // Membuat data transaksi baru yang akan ditambahkan
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

        // Mengurangi stok data barang keluar di database
        for (const itemBarangKeluar of barangKeluar) {
            // Mengurangi stok barang
            await Products.updateOne(
                { kodeProduk: itemBarangKeluar.kodeProduk },
                { $inc: { stok: -itemBarangKeluar.kuantitas } })
        }

        res.status(201).json({ msg: "Transaksi baru berhasil ditambahkan!" })
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// for delete a transaction data
export const deleteTransaction = async (req, res) => {
    const idTransaksi = req.params.idTransaksi
    try {
        // Mengecek apakah data transaksi ada dalam database
        const transaction = await Transaction.findOne({ idTransaksi })
        if (!transaction) return res.status(404).json({ msg: "ID Transaksi tidak ditemukan!" })

        // Mengecek apakah data transaksi sudah selesai
        if (transaction.status === 1) return res.status(403).json({ msg: `Transaksi ${idTransaksi} sudah selesai!` })

        // Mengembalikan stok produk persediaan ketika dihapus
        for (const item of transaction.barangKeluar) {
            // mengembalikan ke product collection
            await Products.updateOne(
                { kodeProduk: item.kodeProduk },
                { $inc: { stok: +item.kuantitas } }
            )

            // Mengembalikan stok terisi
            await Racks.updateOne(
                { produk: item.namaProduk },
                { $inc: { terisi: +item.kuantitas } }
            )
        }

        await Transaction.deleteOne({ idTransaksi })
        res.sendStatus(204)
        console.log('Successfull for delete a data transaction')
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// untuk mengubah status transaksi menjadi selesai
// sekaligus menambahkan history barang keluar
export const updateStatus = async (req, res) => {
    const idTransaksi = req.params.idTransaksi
    try {
        // Mengecek apakah data transaksi ada dalam database
        const transaction = await Transaction.findOne({ idTransaksi })
        if (!transaction) return res.status(404).json({ msg: "ID Transaksi tidak ditemukan!" })

        // Mengupdate status ke selesai
        await Transaction.updateOne(
            { idTransaksi },
            { status: 1 }
        )

        // Menambahkan data barang keluar ke history outproducts
        for (const itemBarangKeluar of transaction.barangKeluar) {
            const dataBarang = {
                kodeProduk: itemBarangKeluar.kodeProduk,
                namaProduk: itemBarangKeluar.namaProduk,
                stokKeluar: itemBarangKeluar.kuantitas
            }

            // Menambahkan data ke dalam database
            await OutProducts.create(dataBarang)
        }

        res.status(201).json({ msg: `Transaksi ${idTransaksi} telah selesai!` })

    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// ----- ENDPOINT TIDAK TERPAKAI -----

// for update a transaction data
export const updateTransaction = async (req, res) => {
    const idTransaksi = req.params.idTransaksi
    const allProduct = await Products.find()
    try {
        // Mengecek apakah data transaksi ada dalam database
        const transaction = await Transaction.findOne({ idTransaksi })
        if (!transaction) return res.status(404).json({ msg: "ID Transaksi tidak ditemukan!" })

        // Mengecek apakah data transaksi sudah selesai
        if (transaction.status === 1) return res.status(403).json({ msg: `Transaksi ${idTransaksi} sudah selesai!` })

        // Menyimpan semua data barang keluar baru ke dalam array
        const barangKeluarBaru = []
        const totalHargaBaru = []
        for (const item of req.body.barangKeluarBaru) {
            let outProduct = allProduct.find(produk => produk.kodeProduk == item.kodeProduk)
            // check item new out product if not exist in database
            if (!outProduct) return res.status(404).json({ msg: `Kode produk ${item.kodeProduk} tidak ditemukan` })
            outProduct = {
                kodeProduk: outProduct.kodeProduk,
                namaProduk: outProduct.namaProduk,
                kuantitas: item.kuantitas,
                hargaSatuan: outProduct.harga,
                subTotal: outProduct.harga * item.kuantitas
            }
            totalHargaBaru.push(outProduct.subTotal)
            barangKeluarBaru.push(outProduct)
        }

        // Melakukan validasi agar data sesuai dengan data lama
        for (const oldItem of req.body.barangKeluarLama) {
            let oldProduct = transaction.barangKeluar.find(produk => produk.kodeProduk == oldItem.kodeProduk)

            // Mengecek apakah data kode produk sama dengan data lama
            if (!oldProduct) return res.status(400).json({ msg: `Kode produk ${oldItem.kodeProduk} salah!` })
            // Mengecek apakah kuantitas sama dengan data lama
            if (oldProduct.kuantitas != oldItem.kuantitas) return res.status(400).json({ msg: `Kuantitas salah!` })
        }

        // Mengembalikan stok lama ke stok produk
        for (const oldStock of req.body.barangKeluarLama) {
            await Products.updateOne(
                { kodeProduk: oldStock.kodeProduk },
                { $inc: { stok: +oldStock.kuantitas } }
            )
        }

        // Membuat data update transaksi
        const updateTransaction = {
            namaPemesan: req.body.namaPemesan,
            alamatPengiriman: req.body.alamatPengiriman,
            barangKeluar: barangKeluarBaru,
            totalHarga: totalHargaBaru.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
            terakhirDiubah: Date.now()
        }

        // Mengupdate data pada collection transactions
        await Transaction.updateOne(
            { idTransaksi },
            updateTransaction
        )

        // Mengupdate stok / mengurangi stok pada produk setelah update
        for (const itemBarangKeluar of barangKeluarBaru) {
            // Mengurangi stok barang
            await Products.updateOne(
                { kodeProduk: itemBarangKeluar.kodeProduk },
                { $inc: { stok: -itemBarangKeluar.kuantitas } })
        }

        res.status(201).json({ msg: `Transaksi ${idTransaksi} berhasil di update!` })

    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}