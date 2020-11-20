const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<sumit2001>:<Engineer>@cluster0.t08d1.mongodb.net/<angulardb>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// app.use(express.static('dist'));
const port = process.env.PORT||8080;
console.log(port)
mongoose.Promise=Promise
mongoose.connect('mongodb+srv://sumit2001:Engineer@cluster0.t08d1.mongodb.net/angulardb?retryWrites=true&w=majority')
.then(()=>console.log('Mongoose up'))

const Student=require('./schemas/students')
const Teacher=require('./schemas/teachers')

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.post('/api/student',async(req,res)=>{
    console.log(req.body)
    const {name,rollno,sclass,section}=req.body
    const student=new Student({
        name,
        rollno,
        sclass,
        section
    })
    const result=await student.save()
    // res.send("Hoorah!!!!!!")
    res.json(result)
})

app.post('/api/student/update',function(req,res){
    // console.log("here is",req.body)
 Student.findByIdAndUpdate(req.body._id,req.body,
 function(err,data){
     if(err){
         res.send(err);
     }
     else{
         res.status(200).json(data);
     }
 });
})

app.post('/api/teacher/update',function(req,res){
    console.log("here is",req.body)
 Teacher.findByIdAndUpdate(req.body._id,req.body,
 function(err,data){
     if(err){
         res.send(err);
     }
     else{
         res.status(200).json(data);
     }
 });
})

app.post('/api/student/deleteData',function(req,res){
    Student.remove({_id:req.body._id},function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send({data:"Record has been deleted"});
        }
    })
})
app.post('/api/teacher/deleteData',function(req,res){
      Teacher.remove({_id:req.body._id},function(err){
          if(err){
              res.send(err);
          }
          else{
            res.send({data:"Record has been deleted"});
          }
      })
  })
app.get('/api/student',function(req,res){
   
       Student.find({},function(err,data){
       if(err){
           res.send(err);
       }
       else{
           res.send(data);
       }
   });

    
})

//Teacher


app.post('/api/teacher',async(req,res)=>{
    console.log(req.body)
    const {name,id,cs}=req.body
    const teacher=new Teacher({
        name,
        id,
        cs
    })
    const result=await teacher.save()
    // res.send("Hoorah!!!!!!")
    res.json(result)
})

app.get('/api/teacher',function(req,res){
   
    Teacher.find({},function(err,data){
    if(err){
        res.send(err);
    }
    else{
        res.send(data);
    }
});


 
})

app.listen(port,()=>console.log('Server listening at 1234'))