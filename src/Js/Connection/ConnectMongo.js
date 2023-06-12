import { connect } from "mongoose"; // import the mongoose module

export default async function connectDB(MongoURL) {
   try{
    await connect(MongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }); // connect to the database
   }
    catch(err){
        console.log(err);
    } // catch any errors
} // create a function to connect to the database
