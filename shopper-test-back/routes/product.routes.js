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
    const allProducts = await Product.findAll()

let packProducts = []
let packQty = []
let productPrice = []
let packPrice = 0
let packId = 0

    allPacks.forEach(async (currentPack) => {

if (currentPack.dataValues.product_id == req.params.code) {
  allPacks.forEach(async (current) => {
    if (current.dataValues.pack_id == currentPack.dataValues.pack_id) {
      packProducts.push(current.dataValues.product_id)
      packQty.push(current.dataValues.qty)
      packId = current.dataValues.pack_id

    }
  })
}



    })

allProducts.forEach(async (currentProduct) => {
packProducts.forEach(async (current) => {
  if (currentProduct.dataValues.code == current) {
    productPrice.push(currentProduct.dataValues.sales_price)
    console.log(productPrice)
  }
})
})

productPrice.map((currentPrice, index) => {
  packQty.map((currentQty, i) => {
    if (i === index) {
      packPrice += currentPrice * currentQty
      console.log(productPrice)

    }
  })
})

    await Product.update(
      {
        name: req.body.name,
          cost_price: req.body.cost_price,
          sales_price: packPrice
      },
       { where: { code: packId }, }
    )

    console.log(packPrice)

// Update a pack price and update the product price
// if (product.dataValues.code.length >= 4) {
//   console.log(product)
// }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Não foi possível atualizar o produto:', err);
  }
});


export { productRouter }
