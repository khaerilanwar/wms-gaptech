import { faker } from "@faker-js/faker/locale/id_ID";
import Database from "../config/Database.js";
import Products from "../models/ProductModel.js";
import InProducts from "../models/InProductModel.js";
import OutProducts from "../models/OutProductModel.js";
import Transaction from "../models/TransactionModel.js";
import Racks from "../models/RackModel.js";
import mongoose from "mongoose";

async function transaksiMasuk() {
    // Menghapus semua collections kecuali collection user
    const colls = await mongoose.connection.listCollections()
    for (const coll of colls) {
        if (coll.name == 'users') continue
        await mongoose.connection.dropCollection(coll.name)
    }

    // Menambahkan generate data rak ke database
    // total posisi rak ada 48
    const rakArray = [];
    // generate lokasi rak
    // contoh posisi rak L1-2-3-4
    // L1 = Lantai 1
    // 2  = Baris rak ke-2
    // 3  = Rak urutan ke-3
    // 4  = Level rak ke-4
    for (let i = 1; i < 2; i++) {
        // lantai ada 1
        for (let j = 1; j <= 3; j++) {
            // baris rak ada 3
            for (let k = 1; k <= 4; k++) {
                // urutan rak ada 4
                for (let l = 1; l <= 4; l++) {
                    // level rak ada 4
                    rakArray.push(`L${i}-${j}-${k}-${l}`);
                    // Menambah data ke database
                    await Racks.create(
                        {
                            rak: `L${i}-${j}-${k}-${l}`,
                            kapasitas: 100,
                            terisi: 0
                        }
                    )
                }
            }
        }
    }

    const rakTerisi = []

    // Menambahkan data produk baru
    // Atur jumlah produk yang mau ditambahkan
    let jumlahProduk = 28
    // Perulangan untuk menambah produk baru ke products collection
    for (let x = 0; x < jumlahProduk; x++) {
        const newProduct = {
            kodeProduk: faker.string.numeric(13),
            namaProduk: faker.commerce.productName(),
            harga: faker.number.int({ min: 10000 / 5000, max: 1000000 / 5000 }) * 5000,
            stok: faker.number.int({ min: 40, max: 100 }),
            posisiRak: faker.helpers.arrayElement(rakArray)
        }

        // Mengecek apakah posisi rak sudah terisi
        if (rakTerisi.includes(newProduct.posisiRak)) continue

        // Menambahkan data ke products collection
        await Products.create(newProduct)

        // Menambahkan data ke inproducts collection
        await InProducts.create(
            {
                kodeProduk: newProduct.kodeProduk,
                namaProduk: newProduct.namaProduk,
                stokMasuk: newProduct.stok
            }
        )

        // Mengubah field produk pada racks collection
        await Racks.updateOne(
            { rak: newProduct.posisiRak },
            {
                produk: newProduct.namaProduk,
                terisi: newProduct.stok
            }
        )
    }
}

async function transaksiKeluar() {

    for (let j = 0; j < 10; j++) {

        // Mendapatkan semua data products
        const allProducts = await Products.find()

        // Generate data barang keluar
        // Array untuk menampung data barang keluar
        const outProducts = []

        // Array untuk menyimpan subtotal dan menjumlahkan
        const totalHarga = []

        // Jumlah barang keluar
        const jumlahBarang = faker.number.int({ min: 1, max: 4 })

        // Looping untuk mendapatkan random data-data produk
        for (let k = 0; k < jumlahBarang; k++) {
            // Mengatur jumlah kuantitas barang keluar
            let kuantitas = faker.number.int({ min: 1, max: 10 })

            // Looping akan terus berjalan sampai random produk
            // tidak ada pada array outProducts dan
            // jumlah kuantitas tidak melebihi stok produk
            let outProduct;
            do {
                outProduct = faker.helpers.arrayElement(allProducts)
            } while (
                outProducts.find(
                    (item) => item.kodeProduk == outProduct.kodeProduk
                ) || kuantitas > outProduct.stok
            );

            // Mendefinisikan data barang keluar
            outProduct = {
                kodeProduk: outProduct.kodeProduk,
                namaProduk: outProduct.namaProduk,
                kuantitas,
                hargaSatuan: outProduct.harga,
                subTotal: outProduct.harga * kuantitas,
            };

            // Menambahkan element total harga dan barang keluar
            totalHarga.push(outProduct.subTotal)
            outProducts.push(outProduct)
        }

        // Mendefinisikan data untuk tiap transaksi
        const current = new Date();
        const transaction = {
            idTransaksi: `${current.getFullYear()}${String(current.getMonth() + 1).padStart(2, "0")}${String(current.getDate()).padStart(2, "0")}${faker.string.numeric({ length: 4 })}`,

            namaPemesan: faker.person.fullName(),

            alamatPengiriman: `${faker.location.streetAddress()} ${faker.location.city()} ${faker.location.zipCode()}`,

            barangKeluar: outProducts,

            totalHarga: totalHarga.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            ),

            status: faker.helpers.arrayElement([0, 1])

        }

        // Menyimpan data transaksi ke transactions collection
        await Transaction.create(transaction)

        for (const item of outProducts) {
            // Menambahkan history barang keluar ke outproducts collection
            await OutProducts.create(
                {
                    kodeProduk: item.kodeProduk,
                    namaProduk: item.namaProduk,
                    stokKeluar: item.kuantitas
                }
            )

            // Mengurangi stok produk pada products collection
            await Products.updateOne(
                { kodeProduk: item.kodeProduk },
                { $inc: { stok: -item.kuantitas } }
            )

            // Mengurangi terisi pada racks collection
            await Racks.updateOne(
                { produk: item.namaProduk },
                { $inc: { terisi: -item.kuantitas } }
            )
        }
    }
}

// Menjalankan seeder transaksi
transaksiMasuk()
    .then(() => console.log('Transaksi masuk seeder has been done!'))
    .then(() => transaksiKeluar())
    .then(() => console.log('Transaksi keluar seeder has been done!'))
    .then(() => mongoose.connection.close())