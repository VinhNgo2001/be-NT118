import pool from "../configs/connectDB"


// let id = req.params.id
//   const results = await pool.query("select * from users where id=?",[id])
//   return res.send( JSON.stringify(results[0]))
let getAllUsers = async(req,res)=>{
    let id = req.params.id
    const [results] = await pool.query("select * from users where id=?",[id])
    return res.status(200).json({
        message:'get data succees',
        data:results[0]
    })
}
let createNewUser = async(req,res)=>{
    let {firstName,passWord,numberPhone}=req.body
    if (!firstName ||!passWord|| !numberPhone){
        return res.status(200).json({
            message:'missing required parmas'
        })
    }


    await pool.query("insert into users(firstName,numberPhone,passWord) values(?,?,?)",[firstName,numberPhone,passWord])
    return res.status(200).json({
        message:'oke'
    })
    

}
let logInUser = async(req,res)=>{
    let {numberPhone ,passWord}=req.body
    console.log('check:  ',req.body)
    if (!numberPhone|| !passWord){
        return res.status(400).json({
            message:'missing required parmas'
        })
    }


    const [results]=await pool.query("select *  from users where numberPhone=?  and passWord=?",[numberPhone,passWord])
    if(!results[0]){
        return res.status(400).json({
            message:'not found number phone or pass'
        })
    }
    return res.status(200).json({
        message:'oke ',
        data:results[0]
        
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
    getAllUsers ,createNewUser,updateUser,logInUser,
}