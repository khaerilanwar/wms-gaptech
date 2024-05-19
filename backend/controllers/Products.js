import Products from "../models/ProductModel.js";
import InProducts from "../models/InProductModel.js";
import { faker } from "@faker-js/faker/locale/id_ID";
import Racks from "../models/RackModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find({}, { _id: 0 }).sort({ namaProduk: 1 })
        res.json(products)
        console.log('Successfull for get all data products')
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
        console.log('Failed for get all data products')
    }
}

export const getProduct = async (req, res) => {
    const kodeProduk = req.params.kodeProduk
    try {
        const product = await Products.findOne({ kodeProduk }, { _id: 0 })
        if (!product) return res.status(404).json({ msg: 'Produk tidak ditemukan' })
        res.json(product)
        console.log('Successfull for get a data product')
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
        console.log('Failed for get a data product')
    }
}

export const addProduct = async (req, res) => {
    try {
        // add field kodeProduk, createdAt and updatedAt
        req.body.kodeProduk = parseInt(faker.string.numeric(13))
        req.body.createdAt = new Date()
        req.body.updatedAt = new Date()

        // cek apakah nama produk sudah ada di database
        const cekNamaProduk = await Products.exists({ namaProduk: req.body.namaProduk })
        if (cekNamaProduk) return res.status(409).json({ msg: `Produk ${req.body.namaProduk} sudah tersedia!` })

        // cek apakah rak masih kosong ketika ditambahkan produk baru
        const cekRak = await Racks.findOne({ rak: req.body.posisiRak })
        if (!cekRak) {
            // ketika rak tidak ada dalam database
            return res.status(400).json({ msg: `Rak ${req.body.posisiRak} tidak terdaftar!` })
        } else {
            if (cekRak.terisi !== 0) return res.status(406).json({ msg: `Rak ${req.body.posisiRak} sudah terisi` })
        }

        // cek stok produk baru apakah melebihi kapasitas
        if (req.body.stok > cekRak.kapasitas) return res.status(406).json({ msg: "Stok produk melebihi kapasitas rak!" })

        // save new product to database
        await Products.create(req.body)
        res.status(201).json({ msg: 'Produk berhasil ditambahkan!', kodeProduk: req.body.kodeProduk })
        console.log('Successfull for add a data product')
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
        console.log('Failed for add a data product')
    }
}

export const updateProduct = async (req, res) => {
    const kodeProduk = req.params.kodeProduk
    req.body.updatedAt = new Date()
    try {
        const updated = await Products.findOneAndUpdate({ kodeProduk }, req.body)
        if (!updated) return res.status(404).json({ msg: 'Produk tidak ditemukan' })
        res.json({ msg: `${updated.namaProduk} berhasil diperbaharui!` })
        console.log('Successfull for update a data product')
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
        console.log('Failed for update a data product')
    }
}

export const deleteProduct = async (req, res) => {
    const kodeProduk = req.params.kodeProduk
    try {
        const product = await Products.findOne({ kodeProduk })
        if (!product) return res.status(404).json({ msg: "Kode produk tidak ditemukan!" })

        // jika kode produk ada di database
        await Products.deleteOne({ kodeProduk })
        res.sendStatus(204)
        console.log('Successfull for delete a data product')
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
        console.log('Failed for delete a data product')
    }
}

export const addStock = async (req, res) => {
    const kodeProduk = req.params.kodeProduk
    try {
        const product = await Products.findOne({ kodeProduk })
        if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan!" })
        // update total stock in products collection
        await Products.updateOne({ kodeProduk }, {
            stok: req.body.stokBaru + product.stok,
            updatedAt: new Date()
        })
        // add in product data to in product collection for history
        await InProducts.create({
            kodeProduk: kodeProduk,
            namaProduk: product.namaProduk,
            stokMasuk: req.body.stokBaru,
            dateInProduct: new Date()
        })
        res.json({ msg: `Berhasil menambah stok ${product.namaProduk}!` })
        console.log('Successfull for add new stock product')
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
        console.log('Failed for add new stock product')
    }
}

