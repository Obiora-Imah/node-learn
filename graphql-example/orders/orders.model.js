

const orders = [
    {
      id: '1',
      items: [
        {
          id: '1',
          product: {
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
          quantity: 2
        }
      ],
      status: 'PROCESSING',
      date: '2021-01-01',
      subtotal: 200,
      grandTotal: 210
    }
  ]

const getAllOrders = () => {
  return orders;
}
module.exports = {
  getAllOrders
}