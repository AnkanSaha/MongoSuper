import { connect, connection } from "mongoose"; // import the mongoose module
import connectDB from "../../Js/Connection/ConnectMongo"; // import the Connect function from the Connect.js file
import CreateModel from '../Model/CreateModel'; // import the Create function from the CreateModel.ts file
import CreateSchema from "../Schema/CreateSchema"; // import the Create function from the CreateSchema.ts file

// CRUD methods
import { Find } from "../../Js/python/Read"; // import the Find function from the Read.js file

// global types
type str = string;
type bool = boolean;
type globe = any;
type int = number;


//  class to run on start/* The above class is a TypeScript implementation of a MongoDB connection
// handler that can connect to a local or cloud server and listen for
// connection events. */
export class Mongo {
    /* These are private properties of the `Mongo` class in TypeScript. */
    private MongoURL: str; // string value to store the URL of the MongoDB database to connect to
    private ConnectionState: str; // string value to check if the connection is to cloud or local
    private NeverDisconnect: bool; // boolean value to check if the connection is to cloud or local
    private Schema: globe; // mongoose schema type
    private models: globe; // mongoose model type
    private CollectionName?: str; // string value to store the name of the collection
    private connection: typeof connection; // mongoose connection type
    private InstantConnect: (MongoURL: str) => Promise<void>; // function to connect to the database

    /**
     * This is a constructor function that initializes properties for a MongoDB connection, including
     * the URL and logging options.
     * @param {str} [MongoURL=mongodb://localhost:27017/test] - A string representing the URL of the
     * MongoDB database to connect to. The default value is 'mongodb://localhost:27017/test', which
     * connects to a local MongoDB instance on the default port and uses a database named 'test'.
     * @param {bool} [Log=true] - The "Log" parameter is a boolean value that determines whether or not
     * to enable logging. If set to true, the code will log information about the database connection.
     * If set to false, no logging will occur.
     */
    constructor(Details: {
        MongoURL: str; // default value is 'mongodb://localhost:27017/test'
        NeverDisconnect: bool; // default value is false
        Schema: globe;
        CollectionName: str;
    }) {
        this.MongoURL = Details === undefined || Details.MongoURL === undefined ? "mongodb://localhost:27017/test" : Details.MongoURL; // assign the MongoURL property
        this.NeverDisconnect = Details === undefined || Details.NeverDisconnect === undefined ? false : Details.NeverDisconnect; // assign the NeverDisconnect property
        this.Schema = Details === undefined || Details.Schema === undefined ? undefined : Details.Schema; // assign the Schema property
        this.CollectionName = Details === undefined || Details.CollectionName === undefined ? undefined : Details.CollectionName; // assign the Collection property
        this.ConnectionState = "Local"; // assign the ConnectionState property
        this.connection = connection; // assign the connection property
        this.InstantConnect = connectDB; // assign the Connect property
        this.models = CreateModel(CreateSchema(this.Schema), this.CollectionName); // assign the models property
    } // end of constructor



    /* The `connect()` method is a method of the `Mongo` class that connects to a MongoDB database using
the `connect()` function from the `mongoose` module. It also checks if the connection is to a cloud
or local server by checking if the `MongoURL` property includes the string "mongodb+srv". Finally,
it calls the `listen()` method to listen for events related to the database connection. */
    // method to connect to the database
    public async Connect(): Promise<void> {
       try{
        await this.InstantConnect(this.MongoURL); // connect to the database
        if (this.MongoURL.includes("mongodb+srv")) {
            this.ConnectionState = "Cloud";
        } else {
            this.ConnectionState = "Local";
        } // check if the connection is to cloud or local
        console.log(`MongoDB connected successfully with ${this.ConnectionState} Server`);

        if (this.NeverDisconnect === true) {
            this.listen(); // listen for events related to the database connection
        } // check if this is a never disconnect connection
       }
       catch{
            console.log("Error while connecting to the database");
       }
    } // end of SingleConnect method



    /* The `private listen()` method is a method of the `Mongo` class that listens for events related to
   the MongoDB database connection. It uses the `connection.on()` method from the `mongoose` module
   to listen for three events: `connected`, `error`, and `disconnected`. */
    private listen() {
        this.connection.on("connected", async (): Promise<void> => {
                console.log(`MongoDB connected successfully with ${this.ConnectionState} Server`);
        }); // listen for connected event

        this.connection.on("error", async (): Promise<void> => {
                console.log(" Error: MongoDB connection failed");
            await connect(this.MongoURL); // connect to the database
                console.log(`MongoDB reconnected successfully with ${this.ConnectionState} Server`);
        });
        this.connection.on("disconnected", async (): Promise<void> => {
            // check if the connection is to cloud or local
                console.log(`MongoDB disconnected with ${this.ConnectionState} Server and trying to reconnect`);
            await connect(this.MongoURL); // connect to the database
                console.log(`MongoDB reconnected successfully with ${this.ConnectionState} Server`);
        });
    } // end of listen method



    // method to disconnect from the database
    public async disconnect(): Promise<void> {
       try{
        if (this.NeverDisconnect === false) {
            console.log(
                "This is not a never disconnect connection, to disconnect use set NeverDisconnect to false"
            );
            return;
        } // check if this is a never disconnect connection
        else {
            this.connection.close(); // disconnect from the database
                console.log(`MongoDB Disconnected successfully with ${this.ConnectionState} Server`);
        }
       }
        catch{
            console.log("Error while disconnecting from the database");
         }
    } // end of disconnect method




    // method to find a document in the database
    public async find(Filter : globe[] = [], limit?: int): Promise<globe[]> {
        try{
            return limit === undefined ? await Find(Filter, this.models) : await Find(Filter, this.models, limit); // find the document in the database
        }
        catch{
            console.log("Error while finding the document");
            return [];
        }
    } // end of find method

    // method to findAndCount a document in the database
    public async findAndCount(Filter : globe[] = []): Promise<globe> {
        try{
            return {
                count: Array.from(await this.find(Filter)).length, // find the document in the database
                Data: await this.find(Filter) // find the document in the database
            };
        }
        catch{
            console.log("Error while finding the document");
            return {
                count: 0,
                Data: []
            };
        }
    }
} // end of alwaysRun class
