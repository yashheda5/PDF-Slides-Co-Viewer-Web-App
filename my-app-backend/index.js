const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const cors = require("cors");

const io = new Server(server,{
    cors:{
        origin: ['https://pdf-slides-co-viewer-web-app.vercel.app', 'http://localhost:3000']
    }
});

app.use(express.json());
app.use(cors({
    origin: ['https://pdf-slides-co-viewer-web-app.vercel.app', 'http://localhost:3000']
}))

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

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


server.listen(3001, ()=>{
    console.log("listening on port 3001");
})