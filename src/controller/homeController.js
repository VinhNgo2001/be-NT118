import pool from "../configs/connectDB"

let getHomePage = async(req,res)=>{
    const results = await pool.query("select * from users")
    return res.render('index.ejs',{dataUser:results[0]})
 
}
let getDetailsUser = async(req,res)=>{
  let id = req.params.id
  const results = await pool.query("select * from users where id=?",[id])
  return res.send( JSON.stringify(results[0]))

}
let postNewUser  =async(req,res)=>{
  let {firstName,lastName,email,numberPhone}=req.body

  console.log('check log', req.body)
  await pool.query("insert into users(firstName,lastName,email,numberPhone) values(?,?,?,?)",[firstName,lastName,email,numberPhone])
  return res.redirect('/')
}

module.exports={
    getHomePage,getDetailsUser,postNewUser
}