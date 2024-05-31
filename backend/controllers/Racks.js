import Racks from "../models/RackModel.js";

// Untuk mendapatkan semua data rak pada database
export const getAllRacks = async (req, res) => {
    try {
        const allRacks = await Racks.find({}, { _id: 0 }).sort({ rak: 1 })
        res.json(allRacks)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// Untuk mendapatkan semua data rak yang penuh
export const getFullRacks = async (req, res) => {
    try {
        const rakPenuh = await Racks.aggregate([
            {
                $match: {
                    $expr: { $eq: ["$terisi", "$kapasitas"] }
                }
            }
        ])

        res.json(rakPenuh)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// Untuk mendapatkan semua data rak yang hampir penuh
// Jika terisi >= 90% dan terisi < 100%
export const getAlmostFullRacks = async (req, res) => {
    try {
        const hampirPenuh = await Racks.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $gte: ['$terisi', { $multiply: ['$kapasitas', 0.9] }] },
                            { $ne: ['$terisi', '$kapasitas'] },
                            { $lt: ['$terisi', '$kapasitas'] }
                        ]
                    }
                }
            }
        ])

        res.json(hampirPenuh)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// Untuk mendapatkan semua data rak yang masih tersedia
// Jika terisi < 90%
export const getAvailableRacks = async (req, res) => {
    try {
        const tersedia = await Racks.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $lt: ['$terisi', { $multiply: ['$kapasitas', 0.9] }] },
                            { $ne: ['$terisi', 0] }
                        ]
                    }
                }
            }
        ])

        res.json(tersedia)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// Untuk mendapatkan semua data rak yang kosong
export const getEmptyRacks = async (req, res) => {
    try {
        const emptyRacks = await Racks.find({ terisi: 0 }, { _id: 0 }).sort({ rak: 1 })

        res.json(emptyRacks)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// Untuk mendapatkan data suatu rak
export const getRack = async (req, res) => {
    try {
        const rak = req.params.rak.toUpperCase()

        // Mengecek apakah data rak ada di database
        const cekRak = await Racks.exists({ rak })
        if (!cekRak) return res.status(400).json({ msg: "Rak tidak ditemukan!" })

        res.json(
            await Racks.findOne({ rak }, { _id: 0 })
        )

    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// Untuk mengupdate kapasitas rak
export const updateRack = async (req, res) => {
    try {
        const rak = req.params.rak.toUpperCase()

        // Mengecek apakah data rak ada di database
        const cekRak = await Racks.findOne({ rak })
        if (!cekRak) return res.status(400).json({ msg: "Rak tidak ditemukan!" })

        // Mengecek apakah ada data kapasitas yang dikirim
        const kapasitasBaru = req.body.kapasitas
        if (!kapasitasBaru) return res.status(400).json({ msg: "Data tidak ditemukan!" })

        // Mengecek apakah nilai kapasitas baru kurang dari stok terisi
        if (kapasitasBaru < cekRak.terisi) return res.status(400).json({ msg: "Kapasitas tidak boleh kurang dari stok terisi!" })

        // Mengganti kapasitas di database
        await Racks.updateOne(
            { rak },
            { kapasitas: req.body.kapasitas }
        )

        res.status(201).json({ msg: `Kapasitas rak ${rak} berhasil diubah!` })

    } catch (error) {
        res.status(500).json({ msg: "Ada kesalahan pada server" })
    }
}