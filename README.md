# mongoland
- mongoland is an superset of mongoose which makes it easier to connect to MongoDB and disconnect from it. also it has CRUD methods which makes it easier to create, read, update and delete data from MongoDB.

## Installation
```bash
npm install mongoland@latest

```

## Usage
```javascript
const mongoland = require('mongoland'); // Importing the package

const Connector = new mongoland.Mongo({MongoURL: 'Provide the URL', NeverDisconnect: 'Provide true/false', Schema: 'Provide the Schema Object', CollectionName: 'Provide the Collection Name'}); // Creating an instance of the Mongo class

```
- Connector is an instance of the Mongo class


## Connection Methods
```javascript

Connector.SingleConnect() // Connects to MongoDB once and you can disconnect using Connector.disconnect()
Connector.alwaysConnect() // Connects to MongoDB and automatically reconnects if disconnected & you can't disconnect
Connector.disconnect() // Disconnects from MongoDB if connected whenever you want (Only works with SingleConnect())

```

## Find Methods
if you want to use CRUD methods, you have to provide the Schema in the constructor
```javascript

Connector.find().then((data) => {
    console.log(data)
}) // Finds all the data in the database

Connector.find([{name: 'John'}]).then((data) => {
    console.log(data)
}) // Set the array of objects to find the data in the database with Specific Filter

Connector.find([{name: 'John'}], 1).then((data) => {
    console.log(data)
}) // Set the array of objects to find the data in the database with Specific Filter and Limit



```
# Important:
- If you Don't provide the URL, it will try to connect to the default URL: mongodb://localhost:27017 with log set to true.