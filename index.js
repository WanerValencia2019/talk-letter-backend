const dotenv = require('dotenv');
dotenv.config()

const  app = require('./server/index');
const connection = require('./db/connection');


const port = Number(process.env.PORT || 8000);



app.listen(port, () => {
  console.log('api listening on http://127.0.0.1:'+port);
});














