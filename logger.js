//important to work with security
//here it runs over a log in linux and windows, when running

const{
    createLogger,
    transports,
    format
} = require('winston');

const logger = createLogger({
    //for creating content in the function
    transports:[
        new transports.Console({
            //to use the regular winston and send to console
            level:'info',
            format: format.combine(format.timestamp(),format.simple())
        }),
        new transports.File({
            //to TRANSPORT the log into a file
            filename:'error.log',
            level:'info',
            format: format.combine(format.timestamp(),format.simple())//careful commas
            //extension log
        })
    ]
})
//referencin in server.js as logger
//using filename as classname to not get confused
//when we finish making the API, we publish it as a service
module.exports = logger;










