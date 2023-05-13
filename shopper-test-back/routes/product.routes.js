import express from "express";
import Product from "../model/product.model.js"

const productRouter = express.Router()

productRouter.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    console.log(allProducts);
    return res.status(200).json(allProducts);
  } catch (err) {
    console.error('Não foi possível obter os produtos:', err);
  }
})


export { productRouter }
