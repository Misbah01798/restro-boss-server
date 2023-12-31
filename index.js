const express = require('express');
const app =express();
require("dotenv").config();
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port =process.env.PORT || 5001;

//midleWire

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o7rdiup.mongodb.net/?retryWrites=true&w=majority`;

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

    const menuData = client.db('restroDb').collection('menu');
    const reviewData = client.db('restroDb').collection('reviews');

    app.get('/menu', async(req, res) =>{
        const result = await menuData.find().toArray();
        res.send(result);
    });

    app.get('/reviews', async(req, res) =>{
        const result = await reviewData.find().toArray();
        res.send(result);
    });
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('boss is running')
})

app.listen(port, ()=>{
    console.log(`Restro Boss is running on port ${port}`);
})