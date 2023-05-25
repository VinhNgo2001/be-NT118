import pool from "../configs/connectDB"

let getAllUsers = async(req,res)=>{
    const [results] = await pool.query("select * from users")
    return res.status(200).json({
        message:'ok',
        data:results
    })
}
let createNewUser = async(req,res)=>{
    let {firstName,lastName,email,numberPhone}=req.body
    if (!firstName || !lastName || !email || !numberPhone){
        return res.status(200).json({
            message:'missing required parmas'
        })
    }


    await pool.query("insert into users(firstName,lastName,email,numberPhone) values(?,?,?,?)",[firstName,lastName,email,numberPhone])
    return res.status(200).json({
        message:'oke'
    })
    

}
let updateUser =async(req,res)=>{
    let {firstName,lastName,email,numberPhone,id}=req.body
    if (!firstName || !lastName || !email || !numberPhone || !id){
        return res.status(200).json({
            message:'missing required parmas'
        })
    }

    await pool.query("update users set firstName =?, lastName=?,email=?,numberPhone=? where id=?",[firstName,lastName,email,numberPhone,id])

    return res.status(200).json({
        message:'oke con de'
    })
}
module.exports ={
    getAllUsers ,createNewUser,updateUser 
}