const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "public");
const INDEX = '/index.html';
const server = express()
    .use(express.static(staticPath))
    .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    },
});

// var color = ["blue", "red", "green", "yellow", "pink", "orange"];

io.on('connection', socket => {

    var Room = "";
    socket.on("room", (room) => {
        socket.join(`${room}`);
        console.log(room);
        Room = room;
    });
    socket.on('mousePosition', (mouse) => {
        console.log(mouse.x, mouse.y);
        io.to(`${Room}`).emit('mousePositions', mouse, socket.id);
    });

});