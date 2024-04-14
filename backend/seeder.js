import { faker } from "@faker-js/faker/locale/id_ID";
import Database from "./config/Database.js";
import Users from "./models/UserModel.js";
import Products from "./models/ProductModel.js";
import bcrypt from "bcrypt";

// Credential main admin
// name     : Khaeril Anwar
// username : admin
// email    : 12210952@bsi.ac.id
// password : 12345

function userSeeder() {
  // iterasi data seeder user
  let jumlahUser = 5;
  for (let i = 0; i < jumlahUser; i++) {
    Users.create({
      name: faker.person.fullName(),
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet
        .email({ provider: "gmail.com", allowSpecialCharacters: false })
        .toLowerCase(),
      password: bcrypt.hashSync(`anwar0${i}`, 10),
    });
  }

  // nambah user yang akan digunakan untuk proses pengembangan
  Users.create({
    name: "Khaeril Anwar",
    username: "admin",
    email: "12210952@bsi.ac.id",
    password: "12345",
  });

  console.log("User seeder has been done!");
}

function productSeeder() {
  const rakArray = []; // total posisi rak ada 48
  // generate lokasi rak
  // contoh posisi rak L1-2-3-4
  // L1 = Lantai 1
  // 2  = Baris rak ke-2
  // 3  = Rak urutan ke-3
  // 4  = Level rak ke-4
  for (let i = 1; i < 2; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 4; k++) {
        for (let l = 1; l <= 4; l++) {
          rakArray.push(`L${i}-${j}-${k}-${l}`);
        }
      }
    }
  }

  // iterasi data produk
  let jumlahProduk = 100;
  for (let x = 0; x < jumlahProduk; x++) {
    Products.create({
      kodeProduk: faker.string.numeric(13),
      namaProduk: faker.commerce.productName(),
      harga:
        faker.number.int({ min: 10000 / 5000, max: 1000000 / 5000 }) * 5000,
      stok: faker.number.int({ min: 0, max: 100 }),
      posisiRak: faker.helpers.arrayElement(rakArray),
    });
  }

  console.log("Product seeder has been done!");
}

console.log(userSeeder());
