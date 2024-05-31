import express from "express";
import {
  Login,
  Logout,
  Register,
  getUser,
  getUsers,
  resetPassword,
  verifyResetToken,
  updatePassword,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { authToken } from "../middleware/authToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  addProduct,
  addStock,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/Products.js";
import {
  getInProducts,
  inProductByMonth,
  inProductByPeriod,
  inProductLast30Days,
} from "../controllers/InProducts.js";
import {
  getOutProducts,
  outProductByMonth,
  outProductByPeriod,
  outProductLast30Days,
} from "../controllers/OutProducts.js";
import {
  deleteTransaction,
  getAllTransactions,
  getProcessTransactions,
  getSuccessTransactions,
  getSuccessTransactionsByPeriod,
  getSuccessTransactionsLast30Days,
  getTransaction,
  saveTransaction,
  updateStatus,
  updateTransaction,
} from "../controllers/Transaction.js";
import {
  getAllRacks,
  getAlmostFullRacks,
  getAvailableRacks,
  getEmptyRacks,
  getFullRacks,
  getRack,
  updateRack,
} from "../controllers/Racks.js"; // Import fungsi dari Rack controller

const router = express.Router();

// Router authentication
router.get("/user", verifyToken, getUser);
router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// Router reset password
router.post("/reset-password", resetPassword);
router.get("/verify-reset-token/:token", verifyResetToken);
router.put("/update-password", authToken, updatePassword);

// Router products
// gunakan middleware verifyToken !!!!!!!!!!!!!!!!!!!!
router.get("/products", verifyToken, getProducts);
router.get("/product/:kodeProduk(\\d+)", verifyToken, getProduct); // kodeProduk hanya menerima numeric
router.post("/product", verifyToken, addProduct);
router.put("/product/:kodeProduk(\\d+)", verifyToken, updateProduct);
router.patch("/product/:kodeProduk(\\d+)", verifyToken, addStock);
router.delete("/product/:kodeProduk(\\d+)", verifyToken, deleteProduct);

// Router in products (history)
router.get("/inproducts", verifyToken, getInProducts);
router.get("/inproducts/last30days", verifyToken, inProductLast30Days);
router.get("/inproducts/data-by-period", verifyToken, inProductByPeriod);
router.get("/inproducts/data-by-month", verifyToken, inProductByMonth);

// Router out products (history)
router.get("/outproducts", verifyToken, getOutProducts);
router.get("/outproducts/last30days", verifyToken, outProductLast30Days);
router.get("/outproducts/data-by-period", verifyToken, outProductByPeriod);
router.get("/outproducts/data-by-month", verifyToken, outProductByMonth);

// Router transaction product
router.get("/transaction/:idTransaksi(\\d+)", verifyToken, getTransaction);
router.post("/transaction", verifyToken, saveTransaction);
router.get("/transactions", verifyToken, getAllTransactions);
router.get("/transactions/process", verifyToken, getProcessTransactions);
router.get("/transactions/success", verifyToken, getSuccessTransactions);
router.get(
  "/transactions/success/last30days", verifyToken,
  getSuccessTransactionsLast30Days
);
router.get(
  "/transactions/success/data-by-period", verifyToken,
  getSuccessTransactionsByPeriod
);
router.delete("/transaction/:idTransaksi(\\d+)", verifyToken, deleteTransaction);
router.put("/transaction/:idTransaksi(\\d+)", verifyToken, updateTransaction);
router.patch("/transaction/:idTransaksi(\\d+)", verifyToken, updateStatus);

// Router racks
router.get("/racks", verifyToken, getAllRacks);
router.get("/racks/empty", verifyToken, getEmptyRacks);
router.get("/racks/full", verifyToken, getFullRacks);
router.get("/racks/almost-full", verifyToken, getAlmostFullRacks);
router.get("/racks/available", verifyToken, getAvailableRacks);
router.get("/rack/:rak", verifyToken, getRack);
router.patch("/rack/:rak", verifyToken, updateRack);

router.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found Sayangku!!</h1>");
});

export default router;
