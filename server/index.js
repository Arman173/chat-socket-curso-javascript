require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server( app );
const io = require('socket.io')( server );

app.use( express.static('public') );

app.get('/hola-mundo', ( req, res ) => {
    res.status(200).send('Hola Mundo desde una ruta');
});

let messages = [
    {
        id: 1,
        text: 'Bienvenido al chat privado de Node y Socket.io',
        nickname: 'Bot - ArmanBot'
    }
];

io.on('connection', socket => {
    console.log(`El nodo con IP: ${ socket.handshake.address } se ha conectado...`);

    socket.emit('messages', messages);

    socket.on('add-message', payload => {
        messages.push( payload );

        io.sockets.emit('messages', messages);
    });
})

server.listen( process.env.PORT, () => {
    console.log(`Server running in: http://localhost:${ process.env.PORT }`);
})