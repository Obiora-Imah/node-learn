const products = [
    {
      id: '1',
      description: 'A product',
      price: 100,
      reviews: [
        {
          id: '1',
          title: 'Great product',
          comment: 'I love this product',
          rating: 5
        }
      ]
    },
    {
      id: '2',
      description: 'Another product',
      price: 200,
      reviews: [
        {
          id: '2',
          title: 'Great product',
          comment: 'I love this product',
          rating: 5
        }
      ]
    }
  ]

const getAllProducts = () => {
  return products;
}
const getProductsByPrice = (minPrice, maxPrice) => {
  console.log('minPrice', minPrice);
  
  return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
}
const getProductById = (id) => {
  return products.find(product => product.id  === id);
}

const addProduct = (product) => {
  products.push(product);
  return getProductById(product.id);
}
module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addProduct
}