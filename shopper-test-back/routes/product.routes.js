import express from "express";
import Product from "../model/product.model.js"

const productRouter = express.Router()


// Read one product
productRouter.get("/:code", async (req, res) => {
  try {
    const product = await Product.findOne({attributes: ['code', 'name', 'cost_price', 'sales_price'], where: {
      code: req.params.code
    }})
    return res.status(200).json(product);
  } catch (err) {
    console.error('Não foi possível obter os produtos:', err);
  }
})

// Read all products
productRouter.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.findAll({attributes: ['code', 'name', 'cost_price', 'sales_price']});
    console.log(allProducts);
    return res.status(200).json(allProducts);
  } catch (err) {
    console.error('Não foi possível obter os produtos:', err);
  }
})


export { productRouter }
