import Racks from "../models/RackModel.js"

export const getAllRacks = async (req, res) => {
    try {
        const racks = await Racks.find()
        res.json(racks)
    } catch (error) {
        
    }
}