import express, { Router } from "express"
import homeController from '../controller/homeController'


let router = express.Router()

const initWebRoute =(app)=>{
    router.get('/',homeController.getHomePage)
    router.get('/details/user/:id',homeController.getDetailsUser)
    router.post('/create-new-user',homeController.postNewUser)
    router.post('/delete-user',homeController.postDeleteUser)
    router.get('/edit-user/:id',homeController.getEditUser)
    router.post('/update-user/:id',homeController.postUpdateUser)
    router.get('/upload',homeController.upLoad)
   
    return app.use('/',router)
}

export default initWebRoute;