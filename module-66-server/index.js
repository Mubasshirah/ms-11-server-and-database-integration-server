const express=require('express');
const app=express();
const port=process.env.PORT || 5000;
const cors=require('cors');
app.use(cors());
app.get('/',(req,res)=>{
    res.send('dragon is running');
});
app.listen(port,()=>{
    console.log(`dragon is running on port ${port}`)
});