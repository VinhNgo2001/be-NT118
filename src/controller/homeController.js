import connection from "../configs/connectDB"

let getHomePage =(req,res)=>{
    let data=[]
    //xu ly logic
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
          console.log('>>> check mysql')
          console.log(results); // results contains rows returned by server
          // console.log(fields); // fields contains extra meta data about results, if available
            data= results
            return res.render('index.ejs',{dataUser:JSON.stringify(data)})
        }
      );

    
}

module.exports={
    getHomePage
}