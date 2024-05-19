import InProducts from "../models/InProductModel.js";

export const getInProducts = async (req, res) => {
    try {
        const inProducts = await InProducts.find({}, { _id: 0 }).sort({ dateInProduct: -1 })
        res.json(inProducts)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const inProductByPeriod = async (req, res) => {
    try {
        const periodData = await InProducts.find({
            dateInProduct: {
                $gte: new Date(req.query.start),
                $lt: new Date(req.query.end).setHours(23, 59, 59, 999)
            }
        }, { _id: 0 }).sort({ dateInProduct: 1 })
        // if (periodData.length == 0) return res.sendStatus(400)
        res.json(periodData)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const inProductLast30Days = async (req, res) => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)
    try {
        const lastMonthData = await InProducts.find({
            dateInProduct: {
                $gte: startDate,
                $lt: new Date()
            }
        }, { _id: 0 }).sort({ dateInProduct: 1 })

        res.json(lastMonthData)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const inProductByMonth = async (req, res) => {
    try {
        const monthData = await InProducts.find({
            $expr: {
                $and: [
                    { $eq: [{ $year: "$dateInProduct" }, req.query.year] },
                    { $eq: [{ $month: "$dateInProduct" }, req.query.month] }
                ]
            }
        }, { _id: 0 }).sort({ dateInProduct: 1 })
        if (monthData.length == 0) return res.sendStatus(400)
        res.json(monthData)
    } catch (error) {
        res.sendStatus(400)
    }
}