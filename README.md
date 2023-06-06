# Mongo-always
- mongo-always is an npm package that enables secure connection to MongoDB. It provides automatic reconnection functionality, ensuring seamless connectivity even after disconnection.

## Installation
```bash
npm install mongo-always@latest

```

## Usage
```javascript
const mongoAlways = require('mongo-always'); // Importing the package

const Connector = new mongoAlways.Mongo('MongoDB_URL', 'Log: true/false'); // Log is optional

```
## Connector is an instance of the Mongo class


## Methods
```javascript

Connector.connect() // Connects to MongoDB

```

# Important:
- If you Don't provide the URL, it will try to connect to the default URL: mongodb://localhost:27017 with log set to true.