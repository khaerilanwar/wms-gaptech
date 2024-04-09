import { faker } from '@faker-js/faker/locale/id_ID'
import Database from './config/Database.js'
import Users from './models/UserModel.js'

const rakArray = [] // total posisi rak ada 48
for (let i = 1; i < 2; i++) {
    for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 4; k++) {
            for (let l = 1; l <= 4; l++) {
                rakArray.push(`L${i}-${j}-${k}-${l}`)
            }
        }
    }
}

const data = {
    kodeProduk: faker.string.numeric(13),
    namaProduk: faker.commerce.productName(),
    harga: faker.number.int({ min: 10000 / 5000, max: 1000000 / 5000 }) * 5000,
    stok: faker.number.int({ min: 0, max: 100 }),
    posisiRak: faker.helpers.arrayElement(rakArray)
}

// Users.updateOne({ _id: '661387e21bab6095a1635b35' }, {
//     refreshToken: '754hsdfgkjadln74cn4w78234xxadffaasakxndax6723nad'
// }).then(() => console.log('Operasi selesai'))


// try {
//     const user = await Users.findOne({ _id: '661370b9818d6a4c9fed1b4a' })

// update data user
// await Users.updateOne({ _id: '661370b9818d6a4c9fed1b4a' }, {
//     refreshToken: '754hsdfgkjadln74cn4w78234xxadffaasakxndax6723nad',
//     name: 'Nurul Rahmanda Afrianisa',
//     email: 'nurulrahmanda123@gmail.com'
// })

// hapus field refresh token
// Users.updateOne({ _id: '661370b9818d6a4c9fed1b4a' }, {
//     $unset: {
//         refreshToken: 1
//     }
// }).then(() => console.log('operasi selesai'))

// console.log(user)
// console.log(user.email)
// console.log(user.name)
// } catch (error) {
//     console.log(error)
// }


// const username = faker.internet.userName({ firstName: 'Khaeril', lastName: 'Anwar' }).toLowerCase()
// Users.find({}, { username: 1 }).then(result => console.log(result))

// try {
// } catch (error) {
//     console.log(error)
// }

// async function createUsername(firstName, lastName) {
//     let newUsername
//     let usernames = await Users.aggregate([{ $group: { _id: null, usernames: { $push: '$username' } } }])
//     usernames = usernames[0].usernames

//     do {
//         newUsername = faker.internet.userName({ firstName, lastName }).toLowerCase()
//     } while (usernames.includes(newUsername));

//     return newUsername
// }

// createUsername('Muhammad', 'Khaeril Anwar').then(result => console.log(result))

// checkUsername('admin').then(result => console.log(result))
// console.log(checkUsername('admin'))