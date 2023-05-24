import express, { Router } from "express"
import homeController from '../controller/homeController'


let router = express.Router()

const initWebRoute =(app)=>{
    router.get('/',homeController.getHomePage)
    router.get('/details/user/:id',homeController.getDetailsUser)
    router.get('/about',(req,res)=>{
        res.send('wibuu cuc manh')
    })
    return app.use('/',router)
}

export default initWebRoute;