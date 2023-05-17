const express=require('express');
const cors=require('cors');
const app=express();
const port=process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
// middleware

// username and password
// adibaju1994
// 4B3Y5ulNEcq6oFRW
// username and password


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://adibaju1994:4B3Y5ulNEcq6oFRW@cluster0.lilwv8k.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDB");
    const usersCollection = database.collection("users");

    app.get('/users',async(req,res)=>{
        const cursor=usersCollection.find();
        const result=await cursor.toArray();
        res.send(result);
    })
    app.get('/users/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const result=await usersCollection.findOne(query);
        res.send(result);
    })
    app.put('/users/:id',async(req,res)=>{
      const id=req.params.id;
      const user=req.body;
      console.log(user);
      const filter={_id: new ObjectId(id)}
      const options={upsert:true}
      const updateUser={
        $set:{
          name:user.name,
          email:user.email
        }
      };
      const result=await usersCollection.updateOne(filter,updateUser,options);
      res.send(result);
    })
    app.post('/users',async(req,res)=>{
        const user=req.body;
        console.log('user is', user)
        const result = await usersCollection.insertOne(user);
        res.send(result);
    })
    app.delete('/users/:id',async(req,res)=>{
        const id=req.params.id;
        console.log('please delete from database',id);
        const query={_id: new ObjectId(id)};
        const result=await usersCollection.deleteOne(query);
        res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/',(req,res)=>{
    res.send('crud server is running')
});
app.listen(port,()=>{
    console.log(`server is running in ${port}`)
})