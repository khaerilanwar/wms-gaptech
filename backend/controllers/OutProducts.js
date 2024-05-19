import OutProducts from "../models/OutProductModel.js";

export const getOutProducts = async (req, res) => {
    try {
        const outProducts = await OutProducts.find({}, { _id: 0 }).sort({ dateOutProduct: -1 })
        res.json(outProducts)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const outProductByPeriod = async (req, res) => {
    try {
        const periodData = await OutProducts.find({
            dateOutProduct: {
                $gte: new Date(req.query.start),
                $lt: new Date(req.query.end).setHours(23, 59, 59, 999)
            }
        }, { _id: 0 }).sort({ dateOutProduct: 1 })
        // if (periodData.length == 0) return res.sendStatus(400)
        res.json(periodData)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const outProductLast30Days = async (req, res) => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)
    try {
        const lastMonthData = await OutProducts.find({
            dateOutProduct: {
                $gte: startDate,
                $lt: new Date()
            }
        }, { _id: 0 }).sort({ dateOutProduct: 1 })

        res.json(lastMonthData)
    } catch (error) {
        res.sendStatus(400)
    }
}

export const outProductByMonth = async (req, res) => {
    try {
        const monthData = await OutProducts.find({
            $expr: {
                $and: [
                    { $eq: [{ $year: "$dateOutProduct" }, req.query.year] },
                    { $eq: [{ $month: "$dateOutProduct" }, req.query.month] }
                ]
            }
        }, { _id: 0 }).sort({ dateOutProduct: 1 })
        if (monthData.length == 0) return res.sendStatus(400)
        res.json(monthData)
    } catch (error) {
        res.sendStatus(400)
    }
}