import { faker } from "@faker-js/faker/locale/id_ID";
import Database from "./config/Database.js";
import Products from "./models/ProductModel.js";
import InProducts from "./models/InProductModel.js";
import OutProducts from "./models/OutProductModel.js";
import bcrypt from "bcrypt";
import Transaction from "./models/TransactionModel.js";
import Racks from "./models/RackModel.js";

async function productSeeder() {
  const rakArray = []; // total posisi rak ada 48
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
        }
      }
    }
  }

  // iterasi data produk
  let jumlahProduk = 100;
  for (let x = 0; x < jumlahProduk; x++) {
    await Products.create({
      kodeProduk: faker.string.numeric(13),
      namaProduk: faker.commerce.productName(),
      harga:
        faker.number.int({ min: 10000 / 5000, max: 1000000 / 5000 }) * 5000,
      stok: faker.number.int({ min: 0, max: 100 }),
      posisiRak: faker.helpers.arrayElement(rakArray),
    });
  }

  console.log("Product seeder has been done!");
  console.log("Product seeder has been done!");
}

async function inProductSeeder() {
  const products = await Products.find();
  for (let i = 0; i < 200; i++) {
    const randProduct = faker.helpers.arrayElement(products);
    await InProducts.create({
      kodeProduk: randProduct.kodeProduk,
      namaProduk: randProduct.namaProduk,
      stokMasuk: faker.number.int({ min: 2, max: 32 }),
      dateInProduct: faker.date.between({
        from: new Date("2024-01-01"),
        to: new Date(),
      }),
    });
  }
}

// uncomment code below to run in product seeder
// inProductSeeder().then(() => console.log('In product seeder has been done!'))

async function outProductSeeder() {
  const products = await Products.find();
  for (let i = 0; i < 100; i++) {
    const randProduct = faker.helpers.arrayElement(products);
    await OutProducts.create({
      kodeProduk: randProduct.kodeProduk,
      namaProduk: randProduct.namaProduk,
      stokKeluar: faker.number.int({ min: 5, max: 23 }),
      dateOutProduct: faker.date.between({
        from: new Date("2024-02-01"),
        to: new Date(),
      }),
    });
  }
}

// uncomment code below to run in product seeder
// outProductSeeder().then(() => console.log('Out product seeder has been done!'))

async function transactionSeeder() {
  const products = await Products.find(
    {},
    { kodeProduk: 1, namaProduk: 1, harga: 1 }
  );

  for (let i = 0; i < 20; i++) {
    const outProducts = [];
    const totalHarga = [];
    for (let j = 0; j < faker.number.int({ min: 1, max: 12 }); j++) {
      let outProduct;
      do {
        outProduct = faker.helpers.arrayElement(products);
      } while (
        outProducts.find((item) => item.kodeProduk == outProduct.kodeProduk)
      );
      let kuantitas = faker.number.int({ min: 1, max: 35 });
      outProduct = {
        kodeProduk: outProduct.kodeProduk,
        namaProduk: outProduct.namaProduk,
        kuantitas,
        hargaSatuan: outProduct.harga,
        subTotal: outProduct.harga * kuantitas,
      };
      totalHarga.push(outProduct.subTotal);
      outProducts.push(outProduct);
    }
    const current = new Date();
    const transaction = {
      idTransaksi: `${current.getFullYear()}${String(
        current.getMonth() + 1
      ).padStart(2, "0")}${String(current.getDate()).padStart(
        2,
        "0"
      )}${faker.string.numeric({ length: 4 })}`,
      namaPemesan: faker.person.fullName(),
      alamatPengiriman: `${faker.location.streetAddress()} ${faker.location.city()} ${faker.location.zipCode()}`,
      barangKeluar: outProducts,
      totalHarga: totalHarga.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ),
      tanggalTransaksi: faker.date.between({
        from: new Date("2024-02-01"),
        to: new Date(),
      }),
      terakhirDiubah: faker.date.between({
        from: new Date("2024-02-25"),
        to: new Date(),
      }),
    };

    await Transaction.create(transaction);
  }
}

// uncomment code below to run in transaction seeder
// transactionSeeder().then(() => console.log('Transaction seeder has been done!'))

async function rackSeeder() {
  const rakArray = []; // total posisi rak ada 48
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
        }
      }
    }
  }

  const allProduct = await Products.find()

  // Mendapatkan persentase data dummy produk
  const percent = Math.floor((80 / 100) * allProduct.length)

  for (let i = 0; i < percent; i++) {
    const dataInput = {
      kodeProduk: faker.string.numeric(13),
      namaProduk: faker.commerce.productName(),
      harga:
        faker.number.int({ min: 10000 / 5000, max: 1000000 / 5000 }) * 5000,
      stok: faker.number.int({ min: 0, max: 100 }),
      posisiRak: faker.helpers.arrayElement(rakArray),
    }
  }

}

// uncomment code below to run the rack seeder
// rackSeeder()
//   .then(() => console.log('Rack seeder has been done!'))