//WHEN NPM i --save => TO KEEP IT SO AT DOING NPM INSTALL, IT INSTALLS THAT
//first, express
const express = require('express');

//now, body parser
const bodyParser = require('body-parser');

//new here for documentation
const swaggerUi = require('swagger-ui-express');

//SQL MODULE
const sql = require('mssql');

//CALLING THE CONFIG FILE
const config = require('./config');//which connects .env

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
app.use(cors());//connect by cross origin

//To make it public-not public - ALWAYS NECESSARY TO RECEIVE DATA, NOT "NOTHING"
app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');//TO CONNECT FROM EVERYWHERE
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');//One more header of connection
    res.header('Access-Control-Allow-Headers', 'Content-Type');//to specific headers
    next();//Do not forget setting next after these changes
})

//to setup swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//Don't forget to deliver swaggerdoc

app.get('/api/hello', function(req, res){

    res.send({"greetings":"hello"});
    //res.send('Hello from RESTFUL API :D')

})

//SP = STORED PROCEDURES
//endpoint = asynchronous
app.get('/api/runsp', function(req, res){//ASYNC

    var ev = req.body;

    //data d as parameter
    //async goes with async, and INSIDE a synchronous*
    execSql(req, res).then(function(rset){
        console.log(rset);
        res.send({"greetingsTwo":rset});
    })
});

//For into all our dbs register
function getConnectionString(){
    let connection;
    for(let i=0; i<= config.databases.length; i++){
            return connection = config.databases[i];
    }
};

async function execSql(req, res){

    let ev = req.body;
    let sqlquery = ev.query;
    let connection = getConnectionString();
    //LAST ONE => create one more config data + .env

    const pool = new sql.ConnectionPool(connection);
    pool.on('error', err=>{
        console.log('Sql errors', err);
        logger.log('info', `sql errors: ${err}`);
    });

    try{
        //async, so...
        await pool.connect();
        let result = await pool.request().query('SELECT * FROM dbo.users');
        var rset = result.recordset[0].vFullname;
        return rset;
    }catch(err){
        return {err:err}
    }finally{
        pool.close();//CLOSE DB 
    }


}

app.get('/api/hello/paul', function(req, res){

    res.send({"greetingsTwo":"Hi, Paul :D"});

})

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













