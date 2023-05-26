import express from "express"
import configViewEngine from "./configs/viewEngine"
require('dotenv').config()
import initWebRoute from "./route/web"
import connection from "./configs/connectDB"
import initApi from './route/api'
var morgan = require('morgan')

const app = express()
const port = process.env.PORT

app.use(morgan('combined'))
//config data from client to sever
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//view
configViewEngine(app)
//router
initWebRoute(app)
//api
initApi(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})