const express = require("express");
const PORT = process.env.PORT || 8000;
const INDEX = '/index.html';
const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    },
});



io.on('connection', socket => {
    var Room = "";
    socket.emit('id', socket.id);
    socket.on("room", (room) => {
        socket.join(`${room}`);
        console.log(room);
        Room = room;
    });
    // console.log(socket.id);
    // io.emit('snake', socket.id);
    socket.on('mousePosition', (mouse) => {
        console.log(mouse.x, mouse.y);

        io.to(`${Room}`).emit('mousePositions', mouse, socket.id);
    });

});