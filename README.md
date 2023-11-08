# MongoSuper

-   MongoSuper is an superset of mongoose which makes it easier to connect to MongoDB and disconnect from it. also it has CRUD methods which makes it easier to create, read, update and delete data from MongoDB.

## Installation

```bash
npm install mongosuper@latest

```

## Usage

```javascript
const MongoSuper = require("mongosuper"); // Importing the package

const Connector = new MongoSuper.Mongo({
    MongoURL: "mongodb://localhost:27017/",
    Database_Name: 'test',
    NeverDisconnect: "Provide true/false",
    Schema: "Provide the Schema Object",
    CollectionName: "Provide the Collection Name",
    isTimeStamps : true // set true if you want to create timestamp in record
}); // Creating an instance of the Mongo class
```

-   Connector is an instance of the Mongo class

## Connection Methods

```javascript
Connector.Connect(); // Connects to MongoDB once and you can disconnect using Connector.disconnect()
Connector.disconnect(); // Disconnects from MongoDB if connected whenever you want (Only works when you pass NeverDisconnect as false in the constructor)
```

## Find Methods

if you want to use CRUD methods, you have to provide the Schema in the constructor

```javascript

Connector.find().then((data) => {
    console.log(data)
}) // Finds all the data in the database


Connector.find('AND', [{name: 'John'}]).then((data) => {
    console.log(data)
    output: [{name: 'John'}, {name: 'John'}, {name: 'John'}]
}) // Set the array of objects to find the data in the database with Specific Filter with AND operator

Connector.find('OR', [{name: 'John'}]).then((data) => {
    console.log(data)
    output: [{name: 'John'}, {name: 'John'}, {name: 'John'}]
}) // Set the array of objects to find the data in the database with Specific Filter with OR operator


Connector.find('AND',[{name: 'John'}], 1).then((data) => {
    console.log(data)
    output: [{name: 'John'}]
}) // Set the array of objects to find the data in the database with Specific Filter and Limit with AND operator

Connector.find('OR',[{name: 'John'}], 1).then((data) => {
    console.log(data)
    output: [{name: 'John'}]
}) // Set the array of objects to find the data in the database with Specific Filter and Limit with OR operator

Connector.findAndCount('AND', [{name: 'John'}]).then((data) => {
    console.log(data)
    output: {
        count: 3,
        data: [{name: 'John'}, {name: 'John'}, {name: 'John'}]
    }
}) // Set the array of objects to find the data in the database with Specific Filter and Count with AND operator

Connector.findAndCount('OR', [{name: 'John'}]).then((data) => {
    console.log(data)
    output: {
        count: 3,
        data: [{name: 'John'}, {name: 'John'}, {name: 'John'}]
    }
}) // Set the array of objects to find the data in the database with Specific Filter and Count with OR operator


Connector.findAndCount('AND', [{name: 'John'}], 1).then((data) => {
    console.log(data)
    output: {
        count: 1,
        data: [{name: 'John'}]
    }
}) // Set the array of objects to find the data in the database with Specific Filter, Count and Limit with AND operator

Connector.findAndCount('OR', [{name: 'John'}], 1).then((data) => {
    console.log(data)
    output: {
        count: 1,
        data: [{name: 'John'}]
    }
}) // Set the array of objects to find the data in the database with Specific Filter, Count and Limit with OR operator

```

## You can also use the following filters for aggregation as per as Mongoose

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

Connector.findAndCount([{ age: { $lt: 20 } }, { age: { $gt: 12 } }], 1, 1).then(
    (data) => {
        console.log(data);
        output: {
            Skipped: 1,
            Limit: 1,
            count: 1,
            Data: [{ age: 13 }];
        }
    }
); // Set the array of objects to find the data in the database with less than and greater than filter, Limit with skip
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

Connector.create({name:"Ankan Saha", Address:{ Street:"Address"}}).then((data) => {
    console.log(data)
    output: {
        status:true,
        message: "Successfully Created Data",
        NewCount: 1,
        NewData: [{name: 'Ankan Saha', Address:{ Street:"Address"}}]
    }
}) // Creates a new document in the database with nested objects

**Note: Make sure you provide the Right Schema in the constructor if you want to use the create method** 

```
# Update Methods

```javascript
Connector.update([{name: 'John'}], {name: 'John Doe'}, false).then((data) => {
    console.log(data)
    output: {
        status:true,
        message: "Successfully Updated Data",
        UpdatedCount: 1,
        UpdatedData: [{name: 'John Doe'}]
    }
}) // Updates the data in the database with multi option set to false

Connector.update([{name:"John"}], {$set:{"User.name":"John", "User.Surname":"Doe"}}, false).then((data) => {
    console.log(data)
    output: {
        status:true,
        message: "Successfully Updated Data",
        UpdatedCount: 1,
        UpdatedData: [{name: 'John', Surname: 'Doe'}]
    }
}) // Updates the data in the database with nested objects


Connector.update([{name: 'John'}], {name: 'John Doe'}, true).then((data) => {
    console.log(data)
    output: {
        status:true,
        message: "Successfully Updated Data",
        UpdatedCount: 5,
        UpdatedData: [{name: 'John Doe'}, {name: 'John Doe'}, {name: 'John Doe'}, {name: 'John Doe'}, {name: 'John Doe'}]
    }
}) // Updates the data in the database with multi option set to true

```
# Delete Methods

```javascript
Connector.delete([{name: 'John'}], false).then((data) => {
    console.log(data)
    output: {
        status:true,
        message: "Successfully Deleted Data",
        DeletedCount: 1,
        DeletedData: [{name: 'John'}]
    }
}) // Deletes the data in the database with multi option set to false

Connector.delete([{name: 'John'}], true).then((data) => {
    console.log(data)
    output: {
        status:true,
        message: "Successfully Deleted Data",
        DeletedCount: 5,
        NewData: [{name:"Ankan"}]
    }
}) // Deletes the data in the database with multi option set to true

```
# Important:

-   If you Don't provide the URL, it will try to connect to the default URL: mongodb://localhost:27017 with log set to true.
