const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const passport = require('passport');
//routes
const authRoutes = require('./../routes/auth.routes');
const categoryRoutes = require('./../routes/category.routes');
const postRoutes = require('./../routes/posts.routes');
const userRoutes = require('./../routes/user.routes');


//midleware
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{    
  origin: "*",      
}});

//load midlewares
app.use(cors({origin:true}));
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(passport.initialize())

//LOAD ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/post', postRoutes);
app.use('/api/users', userRoutes);

let usersConnecteds = []

io.on('connection', (socket) => {
    socket.on('user_connected',(data) => {      
      usersConnecteds.push({...data, socket_id: socket.id});
    }) 
    socket.emit('new_user',usersConnecteds);
    socket.on("disconnect", () => {  
      usersConnecteds = usersConnecteds.filter((v)=>v.socket_id !== socket.id);
    })
});



module.exports = server;