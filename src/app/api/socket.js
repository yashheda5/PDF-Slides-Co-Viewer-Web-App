import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
    res.end();
    return;
  }

  console.log('Socket is initializing');
  const io = new Server(res.socket.server, {
    path: '/api/socket',
    addTrailingSlash: false,
  });

  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('pageChange', (pageNumber) => {
      console.log(`Page change event received: ${pageNumber}`);
      socket.broadcast.emit('pageChange', pageNumber);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  console.log('Socket is initialized');
  res.end();
};

export default SocketHandler;