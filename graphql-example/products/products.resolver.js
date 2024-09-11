const { getAllProducts, getProductById, getProductsByPrice, addProduct } = require('./products.model');
const Query = {
  Query: {
    products: getAllProducts,
    productsByPrice: (_, args) => {
      const { maxPrice, minPrice } = args;
      return getProductsByPrice(minPrice, maxPrice)
    },
    productById: (_, args) => {
      const { id } = args;
      return getProductById(id)
    }
  },
  Mutation: {
    addProduct: (_, args) => {
      return addProduct({ id, description, price } = args);
    }
  }
}

module.exports = Query