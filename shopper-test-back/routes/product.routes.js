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

    //Req Rules
    const product = await Product.findOne({where: {code: req.params.code}})
console.log(typeof parseFloat(req.body.sales_price))

// the new sales_price must be greater than the product cost_price.
if (parseFloat(req.body.sales_price) <= parseFloat(product.cost_price)) {
  return res.status(400).json({ error: "O preço de venda deve ser maior que o preço de custo." });
}

// the new sales_price must be 10% greater than the current sales_price
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
    const allPacks = await Pack.findAll()

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
      }
      })
    })

    productPrice.map((currentPrice, index) => {
      packQty.map((currentQty, i) => {
        if (i === index) {
      packPrice += currentPrice * currentQty
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

// Update a pack price and update the product price
let packIds = []
let productQty = 0
let allPackPrice = 0
if (req.params.code.length >= 4) {
  allPacks.forEach(async (currentPack) => {
if (currentPack.dataValues.pack_id == req.params.code) {
  packIds.push(currentPack.dataValues.product_id)
  productQty = currentPack.dataValues.qty
}
  })
}
console.log(packIds)

if (packIds.length === 1) {
  const packAsProduct = await Product.findOne({ where: {code: req.params.code}})
  allPackPrice = parseFloat(packAsProduct.dataValues.sales_price)
  console.log(allPackPrice)
  let finalProductPrice = (allPackPrice / productQty).toFixed(2)
  console.log(finalProductPrice)

  const packProduct = await Product.update({name: req.body.name,
    cost_price: req.body.cost_price,
    sales_price: finalProductPrice},
    {where: {code: packIds[0]}})
  console.log(packProduct)
}

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Não foi possível atualizar o produto:', err);
  }
});


export { productRouter }
