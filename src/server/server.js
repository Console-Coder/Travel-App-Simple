require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
    primaryObject,
    fetch,
    chainAndGet,
    servReply,
    millisecOf16Days,
    millisecondsInADay,
    calcDays,
    API_KEYS,
    baseUrls
} = require('./serverFuncs');
let {keyNumber} = require('./serverFuncs');
const app = express();

// Preparing the app
app.use(bodyParser.json());
app.use(cors()); // for the dev server to work independently from another origin
app.use(express.static('./dist'));
app.use(express.static('./dist/views'));
app.post('/', chainAndGet);

// Starting our application.
app.listen(3000, (req, res) => console.log('App is on port 3000'));