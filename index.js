const express = require('express');
const {Container} = require('typedi');
const database = require('./helpers/Database').getInstance();
const StockModel = require('./model/stock');
const StockServices = require('./services/stock');
const FileParser = require('./helpers/FileParser');

// Registering components
Container.set('database', database);
Container.set('Stock', StockModel);
Container.set('StockServices', StockServices);
Container.set('FileParser', FileParser);

const port = 9090;
const app = express();

// Starting server
app.listen(port, () => {
    console.log("[info] Server starts at port:", port);
});

app.use(express.json())

// Registering routers
app.use(require('./api'))

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
    const responseData = {message: error.message || "Internal server error", status: error.status || 500};
    response.status(responseData.status).json(responseData);
});

// Connecting to database
Container.get('database').connect().then(() => {
    console.log("[info] connection established to database")
}).catch(() => {
    console.log("[error] Can not connecting to database");
});
