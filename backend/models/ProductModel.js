import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    kodeProduk: {
      type: Number,
      unique: true,
      required: true,
      minlength: 13,
      maxlength: 13,
    },
    namaProduk: { type: String, required: true, unique: true },
    harga: { type: Number, required: true },
    stok: { type: Number, required: true },
    posisiRak: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
  },
  { versionKey: false }
);

const Products = mongoose.model("Product", productSchema);

export default Products;
