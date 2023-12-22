const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.os721gq.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const tasksCollection = client.db("tasksDB").collection("tasksCollection");

    // app.get("/cars", async (req, res) => {
    //   const cursor = await carsCollection.find();

    //   const result = await cursor.toArray();

    //   res.send(result);
    // });

    // app.get("/cars/:category", async (req, res) => {
    //   const category = req.params.category;

    //   const query = { category: category };

    //   const cursor = await carsCollection.find(query);
    //   const result = await cursor.toArray();

    //   res.send(result);
    // });
    // app.get("/cars/cart/email", async (req, res) => {
    //   const cursor = await cartCollection.find();

    //   const result = await cursor.toArray();

    //   res.send(result);
    // });
    // app.get("/cars/cart/email/:email", async (req, res) => {
    //   const email = req.params.email;

    //   const query = { email: email };

    //   const cursor = await cartCollection.find(query);
    //   const result = await cursor.toArray();

    //   res.send(result);
    // });

    // app.get("/cars/category/:id", async (req, res) => {
    //   const id = req.params.id;

    //   const query = { _id: new ObjectId(id) };

    //   const result = await carsCollection.findOne(query);

    //   res.send(result);
    // });

    app.post("/task", async (req, res) => {
      const newTask = req.body;

      const result = await tasksCollection.insertOne(newTask);
      res.send(result);
    });

    // app.post("/cars/cart", async (req, res) => {
    //   const newCarsCart = req.body;

    //   console.log(newCarsCart);
    //   const result = await cartCollection.insertOne(newCarsCart);
    //   res.send(result);
    // });

    // app.put("/cars/update/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateCars = req.body;

    //   console.log(updateCars);
    //   const cart = {
    //     $set: {
    //       photoUrl: updateCars.photoUrl,
    //       productName: updateCars.productName,
    //       typeName: updateCars.typeName,
    //       category: updateCars.category,
    //       price: updateCars.price,
    //       description: updateCars.description,
    //       rating: updateCars.rating,
    //     },
    //   };

    //   const result = await carsCollection.updateOne(filter, cart, options);

    //   res.send(result);
    // });

    // app.delete("/mycart/:id", async (req, res) => {
    //   const id = req.params.id;

    //   console.log(id);

    //   const query = { _id: new ObjectId(id) };

    //   const result = await cartCollection.deleteOne(query);

    //   res.send(result);
    // });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("our task management is running");
});

app.listen(port, () => {
  console.log("server is running and port", port);
});
