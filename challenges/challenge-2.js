import { error } from "console";
import fs from "fs";

const route = "./products.json";

class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  async addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios.");
    }

    // Validar que el código no se repita
    if (this.products.some((prod) => prod.code === product.code)) {
      console.log("El código de producto ya existe.");
    }

    // Asignar un id autoincrementable al producto
    product.id = this.productIdCounter++;

    // Agregar el producto al array
    this.products.push(product);
    const data = JSON.stringify(this.products);
    try {
      await fs.promises.writeFile(route, data);
      // return (content = await fs.promises.readFile(route));
    } catch (err) {
      console.log("no se pudo agregar el producto", err);
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(route, "utf-8");
      const dataJson = JSON.parse(data);
      this.products = dataJson;
      return this.products;
    } catch (err) {
      console.log("No se pudo leer el archivo", err);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(route, "utf-8");
      const dataJson = JSON.parse(data);
      this.products = dataJson;
      const product = this.products.find((prod) => prod.id === id);
      return product;
    } catch (err) {
      console.log("No se encontró el producto", err);
      return [];
    }
  }

  async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      this.products[productIndex] = updatedProduct;

      const data = JSON.stringify(this.products, null, 2);

      try {
        await fs.promises.writeFile(route, data);
        console.log("Se actualizo el producto correctamente");
      } catch (err) {
        console.error("Error al actualizar el producto", err);
      }
    } else {
      console.log("No se encontró el producto");
    }
  }

  async deleteProduct(id) {
    const filteredProducts = this.products.filter(
      (product) => product.id !== id
    );

    if (filteredProducts.length < this.products.length) {
      const data = JSON.stringify(filteredProducts);

      try {
        await fs.promises.writeFile(route, data);
        console.log("Se elimino correctamente el producto");
      } catch (err) {
        console.error("Error al eliminar el producto", err);
      }
    } else {
      console.log("No se encontró el producto");
    }
  }
}

// Ejemplos de uso
async function addNewProduct() {
  const manager = new ProductManager();
  await manager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 10,
    thumbnail: "imagen1.jpg",
    code: "ABC123",
    stock: 20,
  });

  await manager.addProduct({
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 15,
    thumbnail: "imagen2.jpg",
    code: "DEF456",
    stock: 15,
  });

  await manager.addProduct({
    title: "Producto 3",
    description: "Descripción del Producto 3",
    price: 10,
    thumbnail: "imagen3.jpg",
    code: "hij789",
    stock: 25,
  });
  await manager.addProduct({
    title: "Producto 4",
    description: "Descripción del Producto 4",
    price: 15,
    thumbnail: "imagen4.jpg",
    code: "KLM101",
    stock: 15,
  });
  console.log(manager);
}

async function gettingProducts() {
  const manager = new ProductManager();
  const products = await manager.getProducts();
  console.log(products);
}

async function gettingProductById() {
  const manager = new ProductManager();
  const product = await manager.getProductById(3);
  console.log(product);
}

async function udpatingProduct() {
  const manager = new ProductManager();
  try {
    await manager.getProducts();
    await manager.updateProduct(1, {
      title: "titulo modificado ",
    });
    console.log(manager);
  } catch (err) {
    console.log("Ocurrio un problema al actualizar", err);
  }
}

async function deletingProduct() {
  const manager = new ProductManager();
  try {
    await manager.getProducts();
    await manager.deleteProduct(3);
    console.log(manager);
  } catch (err) {
    console.log("Ocurrio un problema al eliminar el producto", err);
  }
}

// addNewProduct();
// gettingProducts();
// gettingProductById();
// udpatingProduct();
// deletingProduct();
