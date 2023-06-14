import { connect, connection } from "mongoose"; // import the mongoose module
import connectDB from "../../Js/Connection/ConnectMongo"; // import the Connect function from the Connect.js file
import CreateModel from "../Model/CreateModel"; // import the Create function from the CreateModel.ts file
import CreateSchema from "../Schema/CreateSchema"; // import the Create function from the CreateSchema.ts file

// CRUD methods
import { Find } from "../../Js/Service/Read"; // import the Find function from the Read.js file
import { Create } from "../../Js/Service/Create"; // import the Create function from the Create.js file
import { Update } from "../../Js/Service/Update"; // import the Update function from the Update.js file
import { Delete } from "../../Js/Service/Delete"; // import the Delete function from the Delete.js file

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
        this.MongoURL =
            Details === undefined || Details.MongoURL === undefined
                ? "mongodb://localhost:27017/test"
                : Details.MongoURL; // assign the MongoURL property
        this.NeverDisconnect =
            Details === undefined || Details.NeverDisconnect === undefined
                ? false
                : Details.NeverDisconnect; // assign the NeverDisconnect property
        this.Schema =
            Details === undefined || Details.Schema === undefined
                ? undefined
                : Details.Schema; // assign the Schema property
        this.CollectionName =
            Details === undefined || Details.CollectionName === undefined
                ? undefined
                : Details.CollectionName; // assign the Collection property
        this.ConnectionState = "Local"; // assign the ConnectionState property
        this.connection = connection; // assign the connection property
        this.InstantConnect = connectDB; // assign the Connect property
        this.models = CreateModel(
            CreateSchema(this.Schema),
            this.CollectionName
        ); // assign the models property
    } // end of constructor

    /* The `connect()` method is a method of the `Mongo` class that connects to a MongoDB database using
the `connect()` function from the `mongoose` module. It also checks if the connection is to a cloud
or local server by checking if the `MongoURL` property includes the string "mongodb+srv". Finally,
it calls the `listen()` method to listen for events related to the database connection. */
    // method to connect to the database
    /**
     * This function connects to a MongoDB database and checks if the connection is to a cloud or local
     * server, and listens for events related to the database connection if it is a never disconnect
     * connection.
     */
    public async Connect(): Promise<void> {
        try {
            await this.InstantConnect(this.MongoURL); // connect to the database
            if (this.MongoURL.includes("mongodb+srv")) {
                this.ConnectionState = "Cloud";
            } else {
                this.ConnectionState = "Local";
            } // check if the connection is to cloud or local
            console.log(
                `MongoDB connected successfully with ${this.ConnectionState} Server`
            );

            if (this.NeverDisconnect === true) {
                this.listen(); // listen for events related to the database connection
            } // check if this is a never disconnect connection
        } catch {
            console.log("Error while connecting to the database");
        }
    } // end of SingleConnect method

    /* The `private listen()` method is a method of the `Mongo` class that listens for events related to
   the MongoDB database connection. It uses the `connection.on()` method from the `mongoose` module
   to listen for three events: `connected`, `error`, and `disconnected`. */
    /**
     * This function listens for connection events and handles errors and disconnections for a MongoDB
     * database.
     */
    private listen() {
        this.connection.on("connected", async (): Promise<void> => {
            console.log(
                `MongoDB connected successfully with ${this.ConnectionState} Server`
            );
        }); // listen for connected event

        this.connection.on("error", async (): Promise<void> => {
            console.log(" Error: MongoDB connection failed");
            await connect(this.MongoURL); // connect to the database
            console.log(
                `MongoDB reconnected successfully with ${this.ConnectionState} Server`
            );
        });
        this.connection.on("disconnected", async (): Promise<void> => {
            // check if the connection is to cloud or local
            console.log(
                `MongoDB disconnected with ${this.ConnectionState} Server and trying to reconnect`
            );
            await connect(this.MongoURL); // connect to the database
            console.log(
                `MongoDB reconnected successfully with ${this.ConnectionState} Server`
            );
        });
    } // end of listen method

    // method to disconnect from the database
    /**
     * This function disconnects from a MongoDB database and logs the disconnection status.
     * @returns A Promise that resolves to void (i.e., nothing).
     */
    public async disconnect(): Promise<void> {
        try {
            if (this.NeverDisconnect === false) {
                console.log(
                    "This is not a never disconnect connection, to disconnect use set NeverDisconnect to false"
                );
                return;
            } // check if this is a never disconnect connection
            else {
                this.connection.close(); // disconnect from the database
                console.log(
                    `MongoDB Disconnected successfully with ${this.ConnectionState} Server`
                );
            }
        } catch {
            console.log("Error while disconnecting from the database");
        }
    } // end of disconnect method

    // method to find a document in the database
    /**
     * This is a TypeScript function that finds documents in a database based on a given filter and limit.
     * @param {globe[]} Filter - Filter is an array of objects that contains the search criteria for the
     * documents to be found in the database. Each object in the array represents a search condition for a
     * specific field in the document.
     * @param {int} [limit] - The `limit` parameter is an optional integer value that specifies the maximum
     * number of documents to be returned by the `find` method. If not provided, all matching documents
     * will be returned.
     * @returns The `find` method is returning a Promise that resolves to an array of `globe` objects. If
     * there is an error while finding the document, an empty array is returned.
     */
    public async find(
        Filter: globe[] = [],
        limit: int = 0,
        skip: int =0
    ): Promise<globe> {
        try {
            return {
                skipped: skip,
                limit,
                count: Array.from(await Find(Filter, this.models, limit, skip))
                    .length, // find the document in the database
                Data: await Find(Filter, this.models, limit, skip) // find the document in the database
            };
        } catch {
            console.log("Error while finding the document");
            return [];
        }
    } // end of find method

    // method to findAndCount a document in the database
    /**
     * This function finds and counts documents in a database based on a given filter and limit.
     * @param {globe[]} Filter - An array of objects that will be used to filter the documents in the
     * database. Each object in the array represents a filter condition.
     * @param {int} [limit] - The limit parameter is an optional integer that specifies the maximum number
     * of documents to return in the result set. If not provided, all matching documents will be returned.
     * @returns This function returns an object with two properties: "count" and "Data". "count" is the
     * number of documents found in the database that match the given filter and limit (if any). "Data" is
     * an array of documents that match the given filter and limit (if any). If there is an error while
     * finding the document, it returns an object with "count" set to 0
     */
    public async findAndCount(
        Filter: globe[] = [],
        limit: int = 0,
        skip: int = 0
    ): Promise<globe> {
        try {
            return {
                skipped: skip,
                limit,
                count: Array.from(await Find(Filter, this.models, limit, skip))
                    .length, // find the document in the database
                Data: await Find(Filter, this.models, limit, skip) // find the document in the database
            };
        } catch {
            console.log("Error while finding the document");
            return {
                count: 0,
                Data: []
            };
        }
    }

    // method to create a document in the database
    /**
     * This is a TypeScript function that creates a document in a database and returns an object with a
     * count and data array, or logs an error message if there is an issue.
     * @param {globe} Data - It is a parameter of type "globe" that is being passed to the "create" method.
     * It is likely an object that contains data to be stored in a database.
     * @returns The `create` method is returning a Promise that resolves to a `globe` object. If the
     * `Create` function call is successful, it will return the created document from the database. If
     * there is an error, the method will catch the error and return a `globe` object with `NewCount` set
     * to 0 and an empty array for `NewData`.
     */
    public async create(Data: globe): Promise<globe> {
        try {
            return await Create(Data, this.models); // create the document in the database
        } catch {
            console.log("Error while creating the document");
            return {
                NewCount: 0,
                NewData: []
            };
        }
    } // end of create method

    // method to update a document in the database

/* The above code is a TypeScript function that updates documents in a database. It takes in three
parameters: Filter (an array of objects used to filter the documents to be updated), Data (an object
containing the updated data), and MultiUpdate (a boolean flag indicating whether to update multiple
documents or just one). */
    public async update(Filter:globe[]=[], Data:globe, MultiUpdate:bool = false) : Promise<globe>{
        try{
            return await Update(Filter, Data, this.models, MultiUpdate);
        }
        catch{
            console.log("Error while updating the document");
            return {
                status:false,
                message:"Failed to Update Data",
                UpdatedCount: 0,
                UpdatedData: []
            };
        }
    }

/**
 * This is a TypeScript function that deletes documents from a database based on specified filters and
 * returns a promise.
 * @param {globe[]} Filter - An optional array of objects that specifies the criteria for selecting
 * documents to delete. If no filter is provided, all documents in the collection will be deleted.
 * @param {bool} [MultiDelete=false] - MultiDelete is a boolean parameter that determines whether to
 * delete multiple documents that match the given filter or just the first document that matches the
 * filter. If MultiDelete is set to true, all documents that match the filter will be deleted. If it is
 * set to false, only the first document that matches the
 * @returns The `delete` method is returning a Promise that resolves to an object of type `globe`. The
 * object contains properties such as `status`, `message`, `DeletedCount`, and `DeletedData`. If the
 * deletion is successful, `status` will be `true`, `DeletedCount` will indicate the number of
 * documents deleted, and `DeletedData` will contain the deleted documents. If the
 */
    public async delete(Filter:globe[]=[], MultiDelete:bool = false) : Promise<globe>{
        try{
            return await Delete(Filter, this.models, MultiDelete);
        }
        catch{
            console.log("Error while deleting the document");
            return {
                status:false,
                message:"Failed to Delete Data",
                DeletedCount: 0,
                DeletedData: []
            };
        }
    } // end of delete method
} // end of alwaysRun class
