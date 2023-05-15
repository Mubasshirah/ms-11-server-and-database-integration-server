const express=require('express');
const app=express();
const port=process.env.PORT || 5000;
const cors=require('cors');
const users=[
    {id:1,name:'adi',email:'adi@gmail.com'},
    {id:2,name:'adiba',email:'adiba@gmail.com'},
    {id:3,name:'adib',email:'adib@gmail.com'}
]
// middleware
app.use(cors());
app.use(express.json());
// middleware
app.get('/',(req,res)=>{
    res.send('dragon is running');
});
app.get('/users',(req,res)=>{
    res.send(users);
});
app.post('/users',(req,res)=>{
    console.log("post api hitting");
    console.log(req.body);
    const newUser=req.body;
   newUser.id=users.length+1;
   users.push(newUser);
   res.send(newUser);
})
app.listen(port,()=>{
    console.log(`dragon is running on port ${port}`)
});