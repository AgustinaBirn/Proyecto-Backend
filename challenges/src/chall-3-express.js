import express from "express";
import { ProductManager } from "./challenge-3.js";

const port = 3000;
const app = express();
const manager = new ProductManager("./challenge-3.js");

app.get("/products", async (req, res) => {
  const limit = +req.query.limit || 0;
  const products = await manager.getProducts(limit);
  res.send({ status: "1", payload: products });
});

app.get("/products/:pid", async (req, res) => {
  const pid = +req.params.pid;
  const productId = await manager.getProductById(pid);
  //   const productId = await manager.getProductById(+req.params.pid);
  res.send({ status: "1", payload: productId });
});

app.listen(port, () => {
  console.log(`Servidor activo en puerto ${port}`);
});
