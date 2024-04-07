import { faker } from '@faker-js/faker/locale/id_ID'
import Database from './config/Database.js'
import { mongoose } from 'mongoose'
import Users from './models/UserModel.js'
import bcrypt from 'bcrypt'

function userSeeder() {
    for (let i = 0; i < 5; i++) {
        Users.insertMany([
            {
                name: faker.person.fullName(),
                username: faker.internet.userName(),
                email: faker.internet.email({ provider: 'gmail.com', allowSpecialCharacters: false }).toLowerCase(),
                password: bcrypt.hashSync(`anwar0${i}`, 10)
            }
        ])
    }

    console.log('User seeder has been done!')
}

userSeeder()