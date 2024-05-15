import Racks from "../models/RackModel.js";

// Untuk mendapatkan semua data rak pada database
export const getAllRacks = async (req, res) => {
    try {
        const allRacks = await Racks.find({}, { _id: 0 })
        res.json(allRacks)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

// Untuk mendapatkan semua data rak yang kosong
export const getEmptyRacks = async (req, res) => {
    try {
        const emptyRacks = await Racks.find({ terisi: 0 }, { _id: 0 })

        res.json(emptyRacks)
    } catch (error) {
        res.sendStatus(500).json({ msg: "Ada kesalahan pada server" })
    }
}

export const updateRack = async (req, res) => {

}