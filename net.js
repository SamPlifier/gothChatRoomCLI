process.stdout.write('\u001B[2j\u001B[0;0f');
const server = require('net').createServer();
let counter = 0;
let sockets = {};
let gothRotation = ['Abyssal aches', 'Lassitudinous loner', 'Bleak bummer', 'Poser punk', 'Effulgent Eyore', 'Doleful dillweed', 'Quintessential conformist '];
let timeStamp = () => {
  const now = new Date();
  let minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
  let hours = now.getHours() > 12 ? `${now.getHours() - 12}` : `${now.getHours()}`;
  let ampm = now.getHours() > 12 ? `pm` : `am`;
  return `${hours}:${minutes}${ampm}`;
};
server.on('connection', socket => {
  socket.id = counter++;

  console.log('New goth arrived');
  socket.write('Type a user name: ');

  socket.on('data', data => {
    if (!sockets[socket.id]) {
      let randomGoth = Math.floor((Math.random() * 7));
      socket.name = data.toString().trim();
      socket.write(`Welcome ${gothRotation[randomGoth]} ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }
    Object.entries(sockets).forEach(([key, clientSocket]) => {
      if (socket.id === key) return;
      clientSocket.write(`${socket.name} (${timeStamp()}): ${data}`);
    });
  });
  socket.on('end', () => {
    delete sockets[socket.id];
    console.log(`Goth ${socket.name} left to be alone.`);
  });
});

server.listen(8000, () => {
  console.log('server.listen');
});
