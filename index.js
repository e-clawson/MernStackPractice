import express from 'express';
import db from './db.js'
import { ObjectId } from 'mongodb';

const app = express()

const port = 3000

//turn it to an async funct so we can use await function
app.get('/', async (req,res) => {
    try {
    //pick the cokllection were workign with to connect to and make 
    //a collection variable 
    //this will connect to the client and give us a db object and a collection method we can use 
    // can pass whatever collection we're trying to connect to (we'll do posts)
    let collection = await db.collection("posts")
    // ned to query or operate on the collection to narrow it down 
    //find specific posts 
    let results = await collection.find({}).limit(50).toArray() //not providing any criteria for the query (just this instead {}) - this will find everything - all posts in the collection 
    //.limit(1) liimits it to the first one - good to use .limit when it is a really big collection 
    res.json(results).status(200)
    } catch (e) {
        res.json(e).status(400)

    }
})

//using express route params to query the data by unique id field 
//get a single post 
app.get("/:id", async (req,res) => {
    try {
        let collection = await db.collection("posts");
        //making a query object - by default this is empty - it eill find everything 
        //but we can specify exactly ewhat we want to look for - in this ones with an id property that matches _id (the request parameter)
        let query = {_id: new ObjectId(req.params.id) }; //assign it to a variable ObjectId is a class so we need new in front of it 
        let result = await collection.findOne(query); //pass the variable - can also use .find()
        if (!result){
            res.send("not found").status(404);
        } else {
            res.send(result).status(200);
        }
    } catch (e){
        console.log(e)
        res.json(e).status(400)
    }

})
        
    

app.listen(port, () => {
    console.log(`connected to server on port ${port}`)
})