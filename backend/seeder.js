import { faker } from '@faker-js/faker/locale/id_ID'

const randomName = faker.person.fullName()
const product = faker.commerce.product()

console.log(randomName)
console.log(product)