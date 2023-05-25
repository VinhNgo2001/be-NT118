import pool from "../configs/connectDB"
import multer from "multer"

let getHomePage = async(req,res)=>{
    const results = await pool.query("select * from users")
    // console.log(">>> home:",results[0])
    return res.render('index.ejs',{dataUser:results[0]})
 
}
let getDetailsUser = async(req,res)=>{
  let id = req.params.id
  const results = await pool.query("select * from users where id=?",[id])
  return res.send( JSON.stringify(results[0]))

}
let postNewUser  =async(req,res)=>{
  let {firstName,lastName,email,numberPhone}=req.body
  // console.log('check log', req.body)
  await pool.query("insert into users(firstName,lastName,email,numberPhone) values(?,?,?,?)",[firstName,lastName,email,numberPhone])
  return res.redirect('/')
}
let postDeleteUser  =async(req,res)=>{
  let id=req.body.idUser
  
  
  await pool.query("DELETE FROM users WHERE id=?",[id])
  console.log('delete user id: ',id )
  return res.redirect('/')
}
let getEditUser = async(req,res)=>{
  let id = req.params.id
  let [results] = await pool.query("select * from users where id=?",[id])
  console.log(">>> edit user",results)
  return res.render('updateUser.ejs',{dataUser:results[0]})
  // return res.send('a')
}
let postUpdateUser  =async(req,res)=>{
  let {firstName,lastName,email,numberPhone,id}=req.body
  await pool.query("update users set firstName =?, lastName=?,email=?,numberPhone=? where id=?",[firstName,lastName,email,numberPhone,id])
  console.log('update user id: ',req.body)
  return res.redirect('/')
}
let getUpLoadPage = (req,res ) =>{
  return res.render('upLoad.ejs')
}
//khai bao multer
const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form

  upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any
      
      if (req.fileValidationError) {
          console.log('check err1: ' ,err)
          return res.send(req.fileValidationError);

      }
      else if (!req.file) {
        console.log('check err2: ' ,err)
        return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
        console.log('check err3: ' ,err)
          return res.send(err);
      }
      // else if (err) {
      //   console.log('check err4: ' ,err)
      //     return res.send(err);
      // }
      
      // Display uploaded image for user validation
      console.log('check log up looad ' ,req.file)
      res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
  });
}


module.exports={
    getHomePage,getDetailsUser,postNewUser,postDeleteUser,getEditUser,
    postUpdateUser,getUpLoadPage,handleUploadFile
}