import express from "express";
import Pack from "../model/pack.model.js";

const packRouter = express.Router()


// Update pack
packRouter.get("", async (req, res) => {
  try {
    const allPacks = await Pack.findAll();
    return res.status(200).json(allPacks);
  } catch (err) {
    console.error('Não foi possível obter os produtos:', err);
  }
})

export { packRouter }
