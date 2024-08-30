const axios = require('axios');

const res =  axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
  console.log(res.data);
}).catch((err) => {
  console.error(err);
})
