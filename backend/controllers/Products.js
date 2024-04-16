import Products from "../models/ProductModel.js";
import { faker } from "@faker-js/faker/locale/id_ID";

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}

export const getProduct = async (req, res) => {
    const kodeProduk = req.params.kodeProduk
    try {
        const product = await Products.findOne({ kodeProduk })
        if (!product) return res.status(404).json({ msg: 'Produk tidak ditemukan' })
        res.json(product)
    } catch (error) {
        console.log(error)
    }
}

export const addProduct = async (req, res) => {
    // add field kodeProduk, createdAt and updatedAt
    req.body.kodeProduk = faker.string.numeric(13)
    req.body.createdAt = new Date()
    req.body.updatedAt = new Date()
    try {
        // save new product to database
        await Products.create(req.body)
        res.sendStatus(201).json({ msg: 'Produk berhasil ditambahkan!' })
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req, res) => {
    const kodeProduk = req.params.kodeProduk
    req.body.updatedAt = new Date()
    try {
        const updated = await Products.findOneAndUpdate({ kodeProduk }, req.body)
        if (!updated) return res.status(404).json({ msg: 'Produk tidak ditemukan' })
        res.json({ msg: `${updated.namaProduk} berhasil diperbaharui!` })
    } catch (error) {
        console.log(error)
    }
}

export const addStock = async (req, res) => {
    const kodeProduk = req.params.kodeProduk
    try {
        const product = await Products.findOne({ kodeProduk })
        if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan!" })
        await Products.updateOne({ kodeProduk }, {
            stok: req.body.stokBaru + product.stok,
            updatedAt: new Date()
        })
        res.json({ msg: `Berhasil menambah stok ${product.namaProduk}!` })
    } catch (error) {
        console.log(error)
    }
}