const socket = io();

var cvs = document.getElementById("canvas");
cvs.height = window.innerHeight;
cvs.width = window.innerWidth;
var ctx = cvs.getContext("2d");
var mouseState = false;
var mousePosition = {
    x: 0,
    y: 0
};
var c = 0;

function tell(e) {
    mouseState = true;
    // ctx.beginPath();
    draw(e);
}
document.addEventListener('mousedown', tell);
document.addEventListener('mouseup', tell2);
document.addEventListener('mousemove', draw);

function tell2(e) {
    // ctx.beginPath();
    // ctx.moveTo(e.clientX, e.clientY);
    mouseState = false;

}
var room = prompt("Enter the room name you want to join");
if (room.length == 0 || room == "null") {

    window.location.reload();
}

socket.emit("room", room);

function draw(e) {
    if (!mouseState) { return; }
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
    // // ctx.strokeStyle = "white";
    // ctx.beginPath();
    // ctx.fillStyle = "white";
    // // ctx.lineWidth = 5;
    // // ctx.lineTo(e.clientX, e.clientY);
    // ctx.arc(e.clientX, e.clientY, 6, 0, 2 * Math.PI);
    // ctx.fill();

    socket.emit('mousePosition', mousePosition);



}
socket.on("mousePositions", (mouse, id) => {

    socket.on('id', (id2) => {
        if (id == id2) {
            c++;
        }

    });

    ctx.beginPath();
    if (c == 1) { ctx.fillStyle = "white"; } else { ctx.fillStyle = "white"; }
    ctx.arc(mouse.x, mouse.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    c = o;
});