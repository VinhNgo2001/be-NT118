import pool from "../configs/connectDB"
import multer from "multer"

let getHomePage = async(req,res)=>{
    const results = await pool.query("select * from users")
    const results2 = await pool.query("select * from films")
    // console.log(">>> home:",results[0])
    return res.render('index.ejs',{dataUser:results[0],dataFilms:results2[0]})
 
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

let handleUploadFile = async (req, res) => {    
      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
        return res.send('Please select an image to upload');
      }
      // Display uploaded image for user validation
      // console.log('check log up looad ' ,req.file)
      res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
 
}
/// films
// let getFilms =async(req,res)=>{
//   const results = await pool.query("select * from films")
    
//   return res.render('index.ejs',{dataFilms:results[0]})
// }


module.exports={
    getHomePage,getDetailsUser,postNewUser,postDeleteUser,getEditUser,
    postUpdateUser,getUpLoadPage,handleUploadFile
}