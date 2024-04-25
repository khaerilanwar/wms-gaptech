import Transaction from "../models/TransactionModel.js";

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ tanggalTransaksi: -1 })
        res.json(transactions)
    } catch (error) {
        res.sendStatus(400)
    }
}

