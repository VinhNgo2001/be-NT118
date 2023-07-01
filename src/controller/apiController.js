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
            message:'missing required parmas',
            message1:'Registration failed',
            message2:"Please complete all information"
        })
    }
    const resultCheck=await pool.query('select * from users where numberPhone=?',[numberPhone])
    if(resultCheck[0].length    >0){
        return res.status(200).json({
            message1:'Registration failed',
            message2:"The phone number has been registered!"
        })
    }

    await pool.query("insert into users(firstName,numberPhone,passWord) values(?,?,?)",[firstName,numberPhone,passWord])
    return res.status(200).json({
        message1:'Sign Up success'
    })
    

}
let logInUser = async(req,res)=>{
    let {numberPhone ,passWord}=req.body
    console.log('check:  ',req.body)
    if (!numberPhone|| !passWord){
        return res.status(400).json({
            message:'good',

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
    let {firstName,email,numberPhone,id}=req.body
    console.log('check req up date user', req.body)
   

    await pool.query("update users set firstName =?,email=?,numberPhone=? where id=?",[firstName,email,numberPhone,id])

    return res.status(200).json({
        message:'oke con de'
    })
}
// films
let getAllFilms = async(req,res)=>{
    const results = await pool.query("select * from films ")
    return res.status(200).json({
        message:'get data films succees',
        data:results[0]
    })
}

let getSearchFilms =async(req,res)=>{
    const searchText = req.body['searchText'];
    console.log('check search text:',searchText)
    if(searchText==''){
        return res.status(200).json({
            message:'missing text'
        })
    }
    const results = await pool.query('select * from films where filmName like ? ',['%'+searchText+'%'])

    console.log('check ket qua tim kiem',results[0])

    return res.status(200).json({
        message: 'ket qua tim kiem',
        data: results[0]
    })
}
//favorite film
let addFavorite = async(req,res)=>{
    let data=req.body
    let userId=data['0']
    let filmId =data['1']
    console.log('check ton tai:',data['0'],data['1'])

    const check=await pool.query("SELECT * FROM favorites WHERE userId = ? AND filmId = ?",[userId,filmId])
    // console.log('check ton tai:',check[0])
    if (check[0].length>0){
        return res.status(200).json({
            message:'bo phim da ton tai trong danh sach'
        })
    }
    else{
        
    }

    await pool.query("insert into favorites (userId,filmId) values(?,?)",[userId,filmId])
    console.log('them thanh cong')
    return res.status(200).json({
        message:'oke'
        
    })
}
let getFavorite =async(req,res)=>{
   

    
    let userId= req.body.id
    console.log('req from film',userId)
    if (!{userId}){
        return res.status(200).json({
            message:'missing id'
        })
    }
    const results= await pool.query(
        "select m.* from users u join favorites f on u.id = f.userId join films m on f.filmId= m.id where u.id=?",[userId] )
        console.log('check log: ',results[0])
    return res.status(200).json({
        message:'oke ',
        data:results[0]   
    })

}

module.exports ={
    getAllUsers ,createNewUser,updateUser,logInUser,getAllFilms,
    addFavorite,getFavorite,getSearchFilms,

}