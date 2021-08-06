const express=require('express');
const app=express();
var cors = require('cors');
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(cors());
app.use(express.json());

const connect=require('./connect/connect');
connect();
// routes
app.use('/users',require('./routes/user'))
app.use('/posts',require('./routes/post'))
app.use('/admins',require('./routes/admin'))
app.use('/courses',require('./routes/course'))


let socketList = {};

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Route
app.get('/ping', (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});

// Socket

io.on('connection',socket=>{
  console.log("user Connected")

  socket.on('end', () => {
    
   socket.disconnect();
    console.log('User disconnected!');
  }); 
   
  socket.on('BE-join-room', ({ roomId, userName }) => {
    console.log('be join =>',roomId,userName)
    socket.join(roomId)
    socketList[socket.id] = { userName, video: true, audio: true };
    console.log(socketList)
    var room=io.sockets.adapter.rooms.get(roomId)
    console.log(room)
    const users = [];
    room.forEach((client) => {
          
      users.push({ userId: client, info: socketList[client] });
    });
    console.log(users)
    socket.broadcast.to(roomId).emit('FE-user-join', users);
   /* io.sockets.clients((err, clients) =>{
      try {
       
        clients.forEach((client) => {
          
          users.push({ userId: client, info: socketList[client] });
        });
        console.log(users)
        //socket.broadcast.to(roomId).emit('FE-user-join', users);
    
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      } 
    } */
    
  })

  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    console.log(roomId,msg,sender)
    socket.broadcast.in(roomId).emit('FE-receive-message', { msg, sender });
    
  });
  
  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.to(roomId).emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });
})










/* io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);

   socket.on('disconnect', () => {
    socket.disconnect();
    socket.close();
    console.log('User disconnected!');
  }); 
  socket.on('disconnect', ()=> {
    // handle disconnect
    io.sockets.disconnect();
    io.sockets.close();});

  socket.on('BE-check-user', ({ roomId, userName }) => {
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      socket.emit('FE-error-user-exist', { error });
    });
  });

  /**
   * Join Room
   
  socket.on('BE-join-room', ({ roomId, userName }) => {
   
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

  
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          
          users.push({ userId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
    
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    console.log(roomId,msg,sender)
    io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
  });

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });
}); */

const PORT=process.env.PORT|| 6000 
http.listen(PORT,(err)=>{err?console.log(err):console.log('the port is runing on port', PORT)})