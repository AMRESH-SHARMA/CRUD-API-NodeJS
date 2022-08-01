const { MongoClient } = require("mongodb");
const express  = require("express");
var ObjectId = require("mongodb").ObjectId;
const app = express();

// Replace the uri string with your connection string.
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db('abc');
const events = database.collection('abcd');

app.use(express.json());

app.get("/",(req, res) => {
  if (req.query.id) {
    async function run() {
      const query = { _id:  new ObjectId(req.query.id)};
      const event = await events.findOne(query);
      res.send(event);
    }
    run().catch(console.dir);
  

  } else if (req.query.type && req.query.limit && req.query.page) {
    console.log(req.query.type);
    res.send("Gets an event by its recency & paginate results by page number and limit of events per page");

  } else {
    res.status(404).end()
  }
});


app.post("/", (req,res) => {
  async function runa() {
    const query = ({
      a:1,
      b:2,
      c:2
    });
    const insertEvent = await events.insertOne(query);
    console.log(insertEvent);
    res.send("Creates an event and returns the Id of the event i.e. created")
  }
  runa().catch(console.dir);
  
});


app.put("/:id", (req,res) => {
  console.log(req.params.id)
  async function runb() {
    const updateEvent = await events.updateOne({a:1},{$set: {a: "444421"} });
    console.log(updateEvent);
    res.send("Udates")
  }
  runb().catch(console.dir);
});
















app.listen(3000);
