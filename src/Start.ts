import { connect, connection } from "mongoose"; // import the mongoose module
import connectDB from "./Connect"; // import the Connect function from the Connect.js file

// global types
type str = string;
type bool = boolean;

//  class to run on start/* The above class is a TypeScript implementation of a MongoDB connection
// handler that can connect to a local or cloud server and listen for
// connection events. */
export class Mongo {
  /* These are private properties of the `Mongo` class in TypeScript. */
  private MongoURL: str; // string value to store the URL of the MongoDB database to connect to
  private Log: bool; // boolean value to check if the logging is enabled or not
  private ConnectionState: str; // string value to check if the connection is to cloud or local
  private connection: typeof connection; // mongoose connection type
  private Connect: (MongoURL: str) => Promise<void>; // function to connect to the database

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
  constructor(
    MongoURL: str = "mongodb://localhost:27017/test", // default value is 'mongodb://localhost:27017/test'
    Log: bool = true // default value is true
  ) {
    this.MongoURL = MongoURL; // assign the MongoURL property
    this.Log = Log; // assign the Log property
    this.ConnectionState = "Local"; // assign the ConnectionState property
    this.connection = connection; // assign the connection property
    this.Connect = connectDB; // assign the Connect property
  } // end of constructor

  /* The `connect()` method is a method of the `Mongo` class that connects to a MongoDB database using
the `connect()` function from the `mongoose` module. It also checks if the connection is to a cloud
or local server by checking if the `MongoURL` property includes the string "mongodb+srv". Finally,
it calls the `listen()` method to listen for events related to the database connection. */
  // method to connect to the database
  public async SingleConnect() {
    await this.Connect(this.MongoURL); // connect to the database
    if (this.MongoURL.includes("mongodb+srv")) {
      this.ConnectionState = "Cloud";
    } else {
      this.ConnectionState = "Local";
    } // check if the connection is to cloud or local

    if (this.Log === true) {
      console.log(
        `MongoDB connected successfully with ${this.ConnectionState} Server`
      );
    } // log the connection status if logging is enabled
  } // end of SingleConnect method
  // method to connect to the database and listen for events
  public async alwaysConnect(): Promise<void> {
    await this.Connect(this.MongoURL); // connect to the database
    if (this.MongoURL.includes("mongodb+srv")) {
      this.ConnectionState = "Cloud";
    } else {
      this.ConnectionState = "Local";
    } // check if the connection is to cloud or local

    //  listen for events
    this.listen(); // listen for events
  } // end of alwaysConnect method

  /* The `private listen()` method is a method of the `Mongo` class that listens for events related to
   the MongoDB database connection. It uses the `connection.on()` method from the `mongoose` module
   to listen for three events: `connected`, `error`, and `disconnected`. */
  private listen() {
    this.connection.on("connected", async (): Promise<void> => {
      if (this.Log === true) {
        console.log(
          `MongoDB connected successfully with ${this.ConnectionState} Server`
        );
      } // log the connection status if logging is enabled
    }); // listen for connected event

    this.connection.on("error", async (): Promise<void> => {
      if (this.Log === true) {
        console.log(" Error: MongoDB connection failed");
      } // log the connection status if logging is enabled

      await connect(this.MongoURL); // connect to the database
      if (this.Log === true) {
        console.log(
          `MongoDB reconnected successfully with ${this.ConnectionState} Server`
        );
      } // log the connection status if logging is enabled
    });
    this.connection.on("disconnected", async (): Promise<void> => {
      // check if the connection is to cloud or local
      if (this.Log === true) {
        console.log(
          `MongoDB disconnected with ${this.ConnectionState} Server and trying to reconnect`
        );
      } // log the connection status if logging is enabled

      await connect(this.MongoURL); // connect to the database
      if (this.Log === true) {
        console.log(
          `MongoDB reconnected successfully with ${this.ConnectionState} Server`
        );
      } // log the connection status if logging is enabled
    });
  } // end of listen method

  // method to disconnect from the database
  public async disconnect(): Promise<void> {
    this.connection.close(); // disconnect from the database

    if (this.Log) {
      console.log(
        `MongoDB Disconnected successfully with ${this.ConnectionState} Server`
      );
    } // log the connection status if logging is enabled
  } // end of disconnect method
} // end of alwaysRun class
