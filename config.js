//extra complexity and security
//here for conexions

require("dotenv").config();

module.exports = {
    //array of json objects
    "databases":[
        {

            "name":'MYREMOTEDB',
            "server":process.env.MYREMOTEDB_SERVER,
            "port": parseInt(process.env.MYREMOTEDB_PORT),
            "database": process.env.MYREMOTEDB_DATABASE,
            "user": process.env.MYREMOTEDB_USER,
            "password": process.env.MYREMOTEDB_PASSWORD,
            "options":{
                trustServerCertificate: true,
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1'
                }
            },
            "dialect": "mssql",

        }
    ]
}
