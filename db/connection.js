const moongose = require('mongoose');

const databaseUrl = process.env.DATABASE_URL;


moongose.set('debug',true)
moongose.connect(databaseUrl);

let  connection = moongose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });


module.exports = connection;