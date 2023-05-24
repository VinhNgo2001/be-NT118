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

module.exports={
    getHomePage,getDetailsUser
}