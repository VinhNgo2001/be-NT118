import express, { Router } from "express"
import ApiController from '../controller/apiController'

let router = express.Router()

const initApi =(app)=>{
    router.get('/users/:id',ApiController.getAllUsers)
    router.post('/create-user',ApiController.createNewUser)
    router.post('/log-in',ApiController.logInUser)
    router.put('/update-user/:id',ApiController.updateUser)

    return app.use('/api/v1',router)
}

export default initApi;