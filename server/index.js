const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const passport = require('passport');
//routes
const authRoutes = require('./../routes/auth.routes');


//midleware
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//load midlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(passport.initialize())

//LOAD ROUTES
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  console.log("CONECTADO A EL S");
});



module.exports = server;