import { app } from "./app.js";

import { config } from "dotenv";
import mongoose from "mongoose";
config()
const port=process.env.PORT||8000;

const url=process.env.MONGO_URL;
const connection=async()=>{
   try {
     await mongoose.connect(`${url}/blogs`)
     console.log("Mongodb connected");
     app.listen(port,()=>{
    console.log(`server is listeninig at ${port}`);
    
})
   } catch (error) {
    console.log(error.message);
   }
}

connection();

