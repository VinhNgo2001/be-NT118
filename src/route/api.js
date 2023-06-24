import express, { Router } from "express"
import ApiController from '../controller/apiController'

let router = express.Router()

const initApi =(app)=>{
    //user
    router.get('/users/:id',ApiController.getAllUsers)
    router.post('/create-user',ApiController.createNewUser)
    router.post('/log-in',ApiController.logInUser)
    router.put('/update-user/:id',ApiController.updateUser)
    //film
    router.get('/films/',ApiController.getAllFilms)
    //favorite
    router.post('/add-favorite',ApiController.addFavorite)
    router.post('/get-favortite',ApiController.getFavorite)


    return app.use('/api/v1',router)
}

export default initApi;