import express from 'express';
import db from './db.js'

const app = express()

const port = 3000

//turn it to an async funct so we can use await function
app.get('/', async (req,res) => {
    //pick the cokllection were workign with to connect to and make 
    //a collection variable 
    //this will connect to the client and give us a db object and a collection method we can use 
    // can pass whatever collection we're trying to connect to (we'll do posts)
    let collection = await db.collection("posts")
    // ned to query or operate on the collection to narrow it down 
    //find specific posts 
    let results = await collection.find({}).limit(1).toArray() //not providing any criteria for the query (just this instead {}) - this will find everything - all posts in the collection 
    //.limit(1) liimits it to the first one - good to use .limit when it is a really big collection 
    console.log(results)
    res.json(results).status(200)
})

app.listen(port, () => {
    console.log(`connected to server on port ${port}`)
})