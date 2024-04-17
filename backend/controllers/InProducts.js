import InProducts from "../models/InProductModel.js";

export const getInProducts = async (req, res) => {
    try {
        const inProducts = await InProducts.find()
        res.json(inProducts)
    } catch (error) {
        console.log(error)
    }
}