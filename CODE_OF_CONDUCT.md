# Mongo-always
## mongoland is a superset of mongoose. It is a wrapper around mongoose. It manage your mongoose connection and keep it alive always. It also provide you some extra features like CRUD operations, etc. [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/).
### Installation
```bash
npm install mongo-always
```
### Usage
```javascript
const mongoAlways = require('mongo-always');
const mongo = new mongoAlways('mongodb://localhost:27017', true);
```