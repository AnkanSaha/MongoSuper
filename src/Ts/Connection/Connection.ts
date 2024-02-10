/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect, connection } from "mongoose"; // import the mongoose module
import Methods, {
    ConnectDB,
    CreateData,
    ReadData,
    UpdateData,
    DeleteData
} from "../../Config/Provider"; // Import All Function from Provider
// global types
type str = string;
type bool = boolean;
type globe = any;
type int = number;

//  class to run on start/* The above class is a TypeScript implementation of a MongoDB connection
// handler that can connect to a local or cloud server and listen for
// connection events. */
export class Mongo {
    /* The above code is defining private properties and types for a `Mongo` class in TypeScript. These
properties include `MongoURL` to store the URL of the MongoDB database to connect to,
`ConnectionState` to check if the connection is to cloud or local, `NeverDisconnect` to check if the
connection is to cloud or local, `Schema` for mongoose schema type, `models` for mongoose model
type, `CollectionName` to store the name of the collection, `connection` for mongoose connection
type, and `InstantConnect` function to connect to the database. */

    /* These are private properties of the `Mongo` class in TypeScript. */
    private MongoURL: str; // string value to store the URL of the MongoDB database to connect to
    private Database_Name: str; // string value to check if the connection is to cloud or local
    private ConnectionState: str; // string value to check if the connection is to cloud or local
    private NeverDisconnect: bool; // boolean value to check if the connection is to cloud or local
    private Schema?: globe; // mongoose schema type
    private models: globe; // mongoose model type
    private CollectionName?: str; // string value to store the name of the collection
    private connection: typeof connection; // mongoose connection type
    private InstantConnect: (MongoURL: str) => Promise<void>; // function to connect to the database
    private isTimeStamps: bool = false; // boolean value to check if the connection is to cloud or local

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
        MongoURL: str; // default value is 'mongodb://localhost:27017/
        Database_Name?: str; // default value is 'test'
        NeverDisconnect: bool; // default value is false
        Schema?: globe; // default value is {}
        CollectionName?: str; // default value is 'test'
        isTimeStamps?: bool; // default value is false
    }) {
        this.Database_Name =
            Details === undefined || Details.Database_Name === undefined
                ? "test"
                : Details.Database_Name; // assign the Database_Name property
        this.MongoURL =
            Details === undefined || Details.MongoURL === undefined
                ? `mongodb://localhost:27017/${this.Database_Name}`
                : `${Details.MongoURL}${this.Database_Name}`; // assign the MongoURL property
        this.NeverDisconnect =
            Details === undefined || Details.NeverDisconnect === undefined
                ? false
                : Details.NeverDisconnect; // assign the NeverDisconnect property
        this.Schema =
            Details === undefined || Details.Schema === undefined
                ? {}
                : Details.Schema; // assign the Schema property
        this.CollectionName =
            Details === undefined || Details.CollectionName === undefined
                ? "test"
                : Details.CollectionName; // assign the Collection property
        this.ConnectionState = "Local"; // assign the ConnectionState property
        this.connection = connection; // assign the connection property
        this.InstantConnect = ConnectDB; // assign the Connect property
        this.models = Methods.CreateModel(
            Methods.CreateSchema(this.Schema, this.isTimeStamps),
            this.CollectionName
        ); // assign the models property
    } // end of constructor

    /* The above code is a TypeScript method called `LogGen` which is marked as `private` and `async`. It
returns a `Promise` of type `globe`. */
    private async LogGen(): Promise<globe> {
        if (this.MongoURL.includes("mongodb+srv")) {
            this.ConnectionState = "Cloud";
        } else {
            this.ConnectionState = "Local";
        } // check if the connection is to cloud or local
    }

    /* The above code is defining a method called `listen` which listens for events related to the MongoDB
connection. It listens for the `connected`, `error`, and `disconnected` events. */
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

    /* The above code is defining a method called `Connect` which is an asynchronous function that connects
to a MongoDB database using a connection string specified in the `MongoURL` property of the class.
It then checks if the connection is local or on a server using a private function called `LogGen`.
If the `NeverDisconnect` property of the class is set to true, it listens for events related to the
database connection. If there is an error while connecting to the database, it logs an error message
to the console. */
    public async Connect(): Promise<globe> {
        try {
            await this.InstantConnect(this.MongoURL); // connect to the database
            await this.LogGen(); // Checking if The Connection String is Local or Server in private function

            if (this.NeverDisconnect === true) {
                this.listen(); // listen for events related to the database connection
            } // check if this is a never disconnect connection

            return {
                status: true,
                message: `MongoDB connected successfully with ${this.ConnectionState} Server`
            };
        } catch {
            return {
                status: false,
                message: "Error: MongoDB connection failed"
            };
        }
    } // end of SingleConnect method

    // method to disconnect from the database
    /* The above code is defining an `async` method called `disconnect` that disconnects from a MongoDB
database. It first checks if the `NeverDisconnect` property is set to `false`, and if it is not, it
logs a message and returns without disconnecting. If it is set to `false`, it closes the connection
to the database and logs a success message. If there is an error while disconnecting, it logs an
error message. */
    public async disconnect(): Promise<globe> {
        try {
            if (this.NeverDisconnect === false) {
                console.log(
                    "This is not a never disconnect connection, to disconnect use set NeverDisconnect to false"
                );
                return {
                    status: false,
                    message:
                        "This is not a never disconnect connection, to disconnect use set NeverDisconnect to false"
                };
            } // check if this is a never disconnect connection
            else {
                this.connection.close(); // disconnect from the database
                return {
                    status: true,
                    message: "MongoDB disconnected successfully"
                };
            }
        } catch {
            return {
                status: false,
                message: "Error: MongoDB disconnection failed"
            };
        }
    } // end of disconnect method

    // method to find a document in the database
    public async find(
        type: str = "AND",
        Filter: globe[] = [],
        limit: int = 0,
        skip: int = 0
    ): Promise<globe> {
        try {
            return {
                skipped: skip,
                limit,
                count: Array.from(
                    await ReadData(type, Filter, this.models, limit, skip)
                ).length, // find the document in the database
                Data: await ReadData(type, Filter, this.models, limit, skip) // find the document in the database
            };
        } catch {
            console.log("Error while finding the document");
            return [];
        }
    } // end of find method

    // method to findAndCount a document in the database
    /* The above code is defining an asynchronous function called `findAndCount` that takes in three
parameters: `Filter` (an array of objects), `limit` (an integer), and `skip` (an integer). The
function returns a Promise that resolves to an object with the following properties: `skipped` (the
number of documents skipped), `limit` (the maximum number of documents to return), `count` (the
number of documents that match the filter), and `Data` (an array of documents that match the
filter). */
    public async findAndCount(
        type: str = "AND",
        Filter: globe[] = [],
        limit: int = 0,
        skip: int = 0
    ): Promise<globe> {
        try {
            return {
                skipped: skip,
                limit,
                count: Array.from(
                    await ReadData(type, Filter, this.models, limit, skip)
                ).length, // find the document in the database
                Data: await ReadData(type, Filter, this.models, limit, skip) // find the document in the database
            };
        } catch {
            console.log("Error while finding the document");
            return {
                count: 0,
                Data: []
            };
        }
    } // FindAndCount Function End

    // method to create a document in the database

    /* The above code is a TypeScript method that creates a new document in a database using the `Create`
function and the `models` object. It takes in a parameter `Data` of type `globe` and returns a
Promise that resolves to a `globe` object. If an error occurs during the creation process, it logs
an error message to the console and returns a `globe` object with `NewCount` set to 0 and an empty
array for `NewData`. */
    public async create(Data: globe): Promise<globe> {
        try {
            return await CreateData(Data, this.models); // create the document in the database
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
    public async update(
        Filter: globe[] = [],
        Data: globe,
        MultiUpdate: bool = false
    ): Promise<globe> {
        try {
            return await UpdateData(Filter, Data, this.models, MultiUpdate);
        } catch {
            console.log("Error while updating the document");
            return {
                status: false,
                message: "Failed to Update Data",
                UpdatedCount: 0,
                UpdatedData: []
            };
        }
    } // end of Update function

    /* The above code is defining an asynchronous method called "delete" that takes in two parameters:
"Filter" which is an array of objects of type "globe" and "MultiDelete" which is a boolean. The
method calls the "Delete" function with the "Filter", "this.models" and "MultiDelete" parameters and
awaits the result. If the deletion is successful, the method returns the result. If there is an
error, the method logs an error message and returns an object with a "status" property set to false,
a "message" property set to "Failed to Delete */
    public async delete(
        Filter: globe[] = [],
        MultiDelete: bool = false
    ): Promise<globe> {
        try {
            return await DeleteData(Filter, this.models, MultiDelete);
        } catch {
            console.log("Error while deleting the document");
            return {
                status: false,
                message: "Failed to Delete Data",
                DeletedCount: 0,
                DeletedData: []
            };
        }
    } // end of delete method
} // end of alwaysRun class
