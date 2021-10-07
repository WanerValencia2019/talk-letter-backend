const moongose = require("mongoose");

const databaseUrl = process.env.DATABASE_URL;
let connection = null;

moongose.set("debug", true);
moongose
  .connect(databaseUrl)
  .then((res) => {
    connection = moongose.connection;
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => console.log(err));

module.exports = connection;
