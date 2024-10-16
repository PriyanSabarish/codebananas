const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Store the list of active users
let activeUsers = [];

// Handle WebSocket connections
wss.on('connection', (ws) => {
 

  // When a user logs in, they send their userId (email)
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log(data.userId,'user connected');
    if (data.action === 'login') {
      // Set userId for this connection
      ws.userId = data.userId;
      console.log(`${ws.userId} has logged in`);

      // Add the user to active users list if not already present
      if (!activeUsers.includes(ws.userId)) {
        activeUsers.push(ws.userId);
      }
      // Broadcast updated list of online users to all clients
      broadcast({
        action: 'updateUsers',
        onlineUsers: activeUsers,
      });
    }

    // Handle the 'codeUpdate' action
    if (data.action === 'codeUpdate') {
      // Broadcast the code change to all other users (except the sender)
      console.log(`Code update from ${ws.userId}`);
      broadcast({
        action: 'codeUpdate',
        userId: ws.userId,
        text: data.text,
        range: data.range,
      }, ws);
    }
  });

  // When a user disconnects
  ws.on('close', () => {
    console.log(ws.userId,'user disconnected');
    
    // Remove the user from active users list
    activeUsers = activeUsers.filter((user) => user !== ws.userId);
    
    // Broadcast updated users list after disconnection
    broadcast({
      action: 'updateUsers',
      onlineUsers: activeUsers,
    });
  });

  // Function to broadcast the active users list and code updates
  function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        // Send to all clients except the sender
        client.send(JSON.stringify(data));
      }
    });
  }
});
