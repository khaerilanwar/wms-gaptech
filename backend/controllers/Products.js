import Products from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}