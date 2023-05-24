import express from "express"
import configViewEngine from "./configs/viewEngine"
require('dotenv').config()
import initWebRoute from "./route/web"
import connection from "./configs/connectDB"


const app = express()
const port = process.env.PORT

//
configViewEngine(app)
//
initWebRoute(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})