const express = require("express");
const dbConnect = require("./mongodb");
var ObjectId = require("mongodb").ObjectId;
const app= express();
app.use(express.json());

app.get("/api/v3/app/events",async(req, res) => {
    let data = await dbConnect();
    if (req.query.id) {
        async function run() {
            const query = { _id:  new ObjectId(req.query.id)};
            const event = await data.findOne(query);
            res.send(event);
          }
          run().catch(console.dir);

    } else if ( req.query.limit || req.query.page || req.query.type) {
      const limit = parseInt(req.query.limit);
      const page = parseInt(req.query.page);
      if (req.query.type == "latest") {
        type = {schedule: 1}
      } else if (req.query.type == "oldest") {
        type = {schedule: -1}
      }
      async function run() {
        const event = await data.find({}).sort(type).limit(limit*page).toArray();
        console.log("get");
        res.send(event);
      }
      run().catch(console.dir);

    } else {
      res.status(404).end()
    }
  });

app.post("/api/v3/app/events", async(req,res) => {
    let data = await dbConnect();
    console.log(req.body);
    async function run() {
    const insertEvent = await data.insertOne(req.body);
    console.log("post");
    res.send(insertEvent)
    }
    run().catch(console.dir);
});

app.put("/api/v3/app/events/:id", async(req,res) => {
    let data = await dbConnect();
    console.log(req.params.id)
    async function run() {
      const updateEvent = await data.updateOne(
        {_id: new ObjectId(req.params.id)},
        {$set: req.body}
        );
      console.log("put");
      res.send(updateEvent)
    }
    run().catch(console.dir);
  });

app.delete("/api/v3/app/events/:id", async(req,res) => {
    let data = await dbConnect();
    console.log(req.params.id);
    async function run() {
        const deleteEvent = await data.deleteOne(
        {_id: new ObjectId(req.params.id)},
        );
        console.log("delete")
        res.send(deleteEvent)
    }
    run().catch(console.dir);
});

app.listen(3000 , (req,res) => {console.log("connected")});
