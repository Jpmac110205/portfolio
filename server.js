require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 3000;

const events = require('./events');
const discord = require('./discord');

// Store chat history in memory
const chatHistory = [];

// ROUTERS
const paymentRouter = require('./paymentRouter');
app.use('/payment', paymentRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'Projects.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'CONTACT.html'));
});

// support section
const clients = new Set();

app.ws('/', (ws, req) => {
    console.log("connection made");
    clients.add(ws);

    // Send chat history to the new client
    ws.send(JSON.stringify({ type: "history", messages: chatHistory }));

    ws.on('message', (msg) => {
        console.log('Received message from client:', msg);

        // Parse message if it's JSON, otherwise treat as string
        let messageObj;
        try {
            messageObj = JSON.parse(msg);
        } catch (e) {
            messageObj = { author: "You", content: msg };
        }

        // Save message to history
        chatHistory.push(messageObj);

        // Broadcast the new message to all clients
        const broadcastMsg = JSON.stringify({ type: "chat", ...messageObj });
        for (const client of clients) {
            if (client.readyState === client.OPEN) {
                client.send(broadcastMsg);
            }
        }

        // discord integration 
        if (messageObj.content) {
            discord.sendToMyChannel(messageObj.content)
                .then(msg => {
                    if (msg && msg.id) {
                        console.log(`Sent message ${msg.id}`);
                    } else {
                        console.log('Message sent to Discord, but no message ID returned.');
                    }
                })
                .catch(err => {
                    console.error('Error sending to Discord:', err);
                });
        } else {
            console.log('No content to send to Discord.');
        }
    });

    ws.on('close', () => {
        console.log('WebSocket closed');
        clients.delete(ws);
    });
});

// Broadcast Discord messages to all connected clients and save to history
events.on('discordMessage', payload => {
  // Save Discord message to chat history
  chatHistory.push({ author: payload.author, content: payload.content });

  const json = JSON.stringify({ type: "discord", ...payload });
  console.log('Broadcasting Discord message to clients:', json);
  for (const ws of clients) {
    if (ws.readyState === ws.OPEN) {
      ws.send(json);
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});