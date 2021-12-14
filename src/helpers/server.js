const webServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");

const server = http.createServer();
server.listen(webServerPort);
console.log("listening on port 8000");

const socketServer = new webSocketServer({
  httpServer: server,
});

const clients = {};

const getUniqueID = () => {
  const randomValue = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return randomValue() + randomValue() + "-" + randomValue();
};

socketServer.on("request", function (request) {
  var userID = getUniqueID();

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      for (key in clients) {
        clients[key].sendUTF(message.utf8Data);
      }
    }
  });
});
