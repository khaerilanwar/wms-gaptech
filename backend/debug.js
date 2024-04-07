import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/anwar')

const Contact = mongoose.model('Contact', {
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nohp: {
        type: String,
    },
})

// Contact

Contact.find().then(result => {
    for (const item of result) {
        console.log(item.nama)
    }
})