const { getAllOrders } = require('./orders.model')
const Query = {
  Query:{
    orders: getAllOrders
  }
}
module.exports = Query