const collection = require('./postman_collection.json'); // any Postman collection JSON file
const { transpile } = require('postman2openapi');
const fs = require("fs");

// Returns a JavaScript object representation of the OpenAPI definition.
const openapi = transpile(collection);

fs.writeFileSync('./signNowOpenApi.json', JSON.stringify(openapi, null, 2));
