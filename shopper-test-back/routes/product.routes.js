import express from "express";
import Product from "../model/product.model.js"
import Pack from "../model/pack.model.js";

const productRouter = express.Router()


// Read all products
productRouter.get("", async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    return res.status(200).json(allProducts);
  } catch (err) {
    console.error('Não foi possível obter os produtos:', err);
  }
})

// Read one product
productRouter.get("/:code", async (req, res) => {
  try {
    const product = await Product.findOne({ where: {
      code: req.params.code
    }})
    return res.status(200).json(product);
  } catch (err) {
    console.error('Não foi possível obter os produtos:', err);
  }
})

// update product
productRouter.put("/:code", async (req, res) => {
  try {
    const allPacks = await Pack.findAll()
    const updatedProduct = await Product.update(
      {
        name: req.body.name,
        cost_price: req.body.cost_price,
        sales_price: req.body.sales_price
      },
      { where: { code: req.params.code }, }
    );

    // If the product is in a pack, change the pack price
    const product = await Product.findOne({ where: {
      code: req.params.code
    }})
    allPacks.forEach(async (currentKey) => {
if (currentKey.dataValues.product_id == req.params.code) {
  await Product.update(
    {
      name: req.body.name,
        cost_price: req.body.cost_price,
        sales_price: currentKey.dataValues.qty * product.dataValues.sales_price
    },
     { where: { code: currentKey.dataValues.pack_id }, }
  )
}
    })
    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Não foi possível atualizar o produto:', err);
  }
});


export { productRouter }
