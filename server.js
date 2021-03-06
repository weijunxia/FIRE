const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const dotenv = require('dotenv')
const db = require('./db')

const AppRouter = require('./routes/AppRouter')

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'))

app.use('/api', AppRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  })
}

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Server Running on Port:`, PORT))
