import { faker } from "@faker-js/faker/locale/id_ID";
import Users from "../models/UserModel.js";
import Database from "../config/Database.js";
import bcrypt from "bcrypt";

// Credential main admin
// name     : Khaeril Anwar
// username : admin
// email    : 12210952@bsi.ac.id
// password : 12345

async function userSeeder() {
    // iterasi data seeder user
    let jumlahUser = 5;
    for (let i = 0; i < jumlahUser; i++) {
        await Users.create({
            name: faker.person.fullName(),
            username: faker.internet.userName().toLowerCase(),
            email: faker.internet
                .email({ provider: "gmail.com", allowSpecialCharacters: false })
                .toLowerCase(),
            password: bcrypt.hashSync(`anwar0${i}`, 10),
        });
    }

    // nambah user yang akan digunakan untuk proses pengembangan
    // Users.create({
    //     name: "Khaeril Anwar",
    //     username: "admin",
    //     email: "12210952@bsi.ac.id",
    //     password: "12345",
    // });
}

userSeeder()
    .then(() => console.log('User Seeder has been done!'))