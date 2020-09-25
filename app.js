require('dotenv').config()
const express = require("express");
const logger = require("morgan");
const helmet = require('helmet')
const routerUser = require("./routers/user");
const routerDeck = require('./routers/decks');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejsapi', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => console.log("Success")).catch((err) => {
    console.log(`Failed with erorr ${err}`);
})
const app = express();
// Middleware
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route
app.use('/users', routerUser);
app.use('/decks', routerDeck);

//Error Handle
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

app.use('/error', (err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).json({
        message: err.message
    })
})

const port = app.get('port') || 8888;
app.listen(port, () => {
    console.log("Server starting");
})