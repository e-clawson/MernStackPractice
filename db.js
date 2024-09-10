import { MongoClient } from "mongodb";
import 'dotenv/config'

const connectionString = process.env.ATLAS_URI || ""

const client = new MongoClient(connectionString)
//gives us a client object which we can use t make the initial connectiont o the database

//create a global connection variable using a try/catch 
let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

//create a db variable and use that to connect to a specific database in our cluster 
let db = conn.db("sample_training")

//export that database variable globally 
export default db;