class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(product) {
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
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado.");
    }
  }
}

// Ejemplo de uso
const manager = new ProductManager();
manager.addProduct({
  title: "Producto 1",
  description: "Descripción del Producto 1",
  price: 10,
  thumbnail: "imagen1.jpg",
  code: "ABC123",
  stock: 20,
});

manager.addProduct({
  title: "Producto 2",
  description: "Descripción del Producto 2",
  price: 15,
  thumbnail: "imagen2.jpg",
  code: "DEF456",
  stock: 15,
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));
