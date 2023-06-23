import express, { Router } from "express"
import homeController from '../controller/homeController'

import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');


let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute =(app)=>{
    router.get('/',homeController.getHomePage)
    router.get('/details/user/:id',homeController.getDetailsUser)
    router.post('/create-new-user',homeController.postNewUser)
    router.post('/delete-user',homeController.postDeleteUser)
    router.get('/edit-user/:id',homeController.getEditUser)
    router.post('/update-user/:id',homeController.postUpdateUser)
    router.get('/upload',homeController.getUpLoadPage)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)
    // router.get('/films',homeController.getFilms)
    router.post('/create-new-film',homeController.creatNewFilm)    
   
    return app.use('/',router)
}

export default initWebRoute;