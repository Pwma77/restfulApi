//first, express
const express = require('express');

//now, body parser
const bodyParser = require('body-parser');

//new here for documentation
const swaggerUi = require('swagger-ui-express');

//JSON web tokens here
const jwt = require('jsonwebtoken');

//to import the logger
const logger = require('./logger');

//to make it secure and encrypt some pass, code to encode and viceversa
const bcrypt = require('bcrypt');//COMPARES

//for connecting into different domains
const cors = require('cors')

const swaggerDocument = require('./swagger.json');//is a json file, not js
//express and connection
const app = express();
const port = 40000;
app.use(bodyParser.json({limit: '100mb'}));

//to setup swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//Don't forget to deliver swaggerdoc

app.get('/api/hello', function(req, res){

    res.send('Hello from RESTFUL API :D')

});

//get in a different way
app.get('/api/hellont', (req, res)=>{

    res.send('Hellont from RESTFUL API :D')

});

app.post('/', function(req,res){
    res.send('POST req to home')//for sending a res as post
});

app.listen(port, function(){
    //function to feedback that is working
    console.log(`RESTFUL API listening at port ${port}`);//another way of concatenating
    logger.log('info', 'RESTFUL API executed');//winston helps to receive the parameters info in level (loggin' info msg)
});













