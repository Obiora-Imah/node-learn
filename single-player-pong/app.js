
const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', express.static('index.html'))

// const PORT = 3000

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`)
// });

module.exports = app