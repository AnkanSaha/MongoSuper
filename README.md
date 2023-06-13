# mongoland

-   mongoland is an superset of mongoose which makes it easier to connect to MongoDB and disconnect from it. also it has CRUD methods which makes it easier to create, read, update and delete data from MongoDB.

## Installation

```bash
npm install mongoland@latest

```

## Usage

```javascript
const mongoland = require("mongoland"); // Importing the package

const Connector = new mongoland.Mongo({
    MongoURL: "Provide the URL",
    NeverDisconnect: "Provide true/false",
    Schema: "Provide the Schema Object",
    CollectionName: "Provide the Collection Name"
}); // Creating an instance of the Mongo class
```

-   Connector is an instance of the Mongo class

## Connection Methods

```javascript
Connector.SingleConnect(); // Connects to MongoDB once and you can disconnect using Connector.disconnect()
Connector.alwaysConnect(); // Connects to MongoDB and automatically reconnects if disconnected & you can't disconnect
Connector.disconnect(); // Disconnects from MongoDB if connected whenever you want (Only works with SingleConnect())
```

## Find Methods

if you want to use CRUD methods, you have to provide the Schema in the constructor

```javascript

Connector.find().then((data) => {
    console.log(data)
}) // Finds all the data in the database


Connector.find([{name: 'John'}]).then((data) => {
    console.log(data)
    output: [{name: 'John'}, {name: 'John'}, {name: 'John'}]
}) // Set the array of objects to find the data in the database with Specific Filter


Connector.find([{name: 'John'}], 1).then((data) => {
    console.log(data)
    output: [{name: 'John'}]
}) // Set the array of objects to find the data in the database with Specific Filter and Limit


Connector.findAndCount([{name: 'John'}]).then((data) => {
    console.log(data)
    output: {
        count: 3,
        data: [{name: 'John'}, {name: 'John'}, {name: 'John'}]
    }
}) // Set the array of objects to find the data in the database with Specific Filter and Count


Connector.findAndCount([{name: 'John'}], 1).then((data) => {
    console.log(data)
    output: {
        count: 1,
        data: [{name: 'John'}]
    }
}) // Set the array of objects to find the data in the database with Specific Filter, Limit and Count

```

## You can also use the following filters for aggregation

```javascript
Connector.find([{ age: { $lt: 20 } }, { age: { $gt: 12 } }]).then((data) => {
    console.log(data);
    output: [
        { age: 13 },
        { age: 14 },
        { age: 15 },
        { age: 16 },
        { age: 17 },
        { age: 18 },
        { age: 19 }
    ];
}); // Set the array of objects to find the data in the database with less than and greater than filter

Connector.find([{ age: { $lte: 20 } }, { age: { $gte: 12 } }]).then((data) => {
    console.log(data);
    output: [
        { age: 12 },
        { age: 13 },
        { age: 14 },
        { age: 15 },
        { age: 16 },
        { age: 17 },
        { age: 18 },
        { age: 19 },
        { age: 20 }
    ];
}); // Set the array of objects to find the data in the database with less than or equal to and greater than or equal to filter

Connector.find([{ age: { $lt: 20 } }, { age: { $gt: 12 } }], 1).then((data) => {
    console.log(data);
    output: [{ age: 13 }];
}); // Set the array of objects to find the data in the database with less than and greater than filter and Limit
```

# Insert Methods

```javascript

Connector.create({name: 'John'}).then((data) => {
    console.log(data)
    output: {
        status:true,
        message: "Successfully Created Data",
        NewCount: 1,
        NewData: [{name: 'John'}]
    }
}) // Creates a new document in the database

```

# Important:

-   If you Don't provide the URL, it will try to connect to the default URL: mongodb://localhost:27017 with log set to true.
