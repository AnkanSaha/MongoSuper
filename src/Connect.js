import { connect } from "mongoose"; // import the mongoose module

export default async function connectDB(MongoURL) {
    await connect(MongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }); // connect to the database
} // create a function to connect to the database
