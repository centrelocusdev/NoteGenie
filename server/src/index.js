require('dotenv').config() 
require('./connection')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const userRouter = require('./userRoutes')
const templateRoutes = require('./templateRoutes')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) 
app.use(userRouter)
app.use(templateRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server running at http://127.0.0.1:${process.env.PORT}`)
})