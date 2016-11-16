//Main starting point the application
const express= require('express');
const http = require('http');
const bodyParser= require('body-parser');
const morgan = require('morgan');

const router = require('./router.js');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
//DB Setup

mongoose.connect('mongodb://localhost:authen/authen');


//Appp Setup

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);




//Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listen on port' , port);