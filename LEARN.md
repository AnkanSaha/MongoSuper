# Mongo-always
## Mongo-always is a npm package that allows you to always have a connection to your mongo database. It is a wrapper for the [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/).
### Installation
```bash
npm install mongo-always
```
### Usage
```javascript
const mongoAlways = require('mongo-always');
const mongo = new mongoAlways('mongodb://localhost:27017', true);
```
### API

#### new mongoAlways(mongoUrl, true)
##### mongoUrl
Type: `string`
The url to your mongo database.

##### true
Type: `boolean`
Whether or not get logs from the database.
