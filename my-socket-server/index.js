const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.io server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST']
  }
});

// Track connected clients
const connectedClients = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  connectedClients.set(socket.id, { socket });

  // Handle sending messages
  socket.on('send_message', (message) => {
    console.log('Message sent:', message);
    // Broadcast to all connected clients
    io.emit('new_message', message);
  });

  // Handle WhatsApp webhook events
  socket.on('whatsapp_webhook', (data) => {
    console.log('WhatsApp webhook event:', data);
    io.emit('new_message', {
      ...data,
      source: 'whatsapp'
    });
  });

  // Handle iMessage webhook events
  socket.on('imessage_webhook', (data) => {
    console.log('iMessage webhook event:', data);
    io.emit('new_message', {
      ...data,
      source: 'imessage'
    });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    connectedClients.delete(socket.id);
  });
});

// API endpoints for webhook integration
app.use(express.json());

app.post('/api/webhook/whatsapp', (req, res) => {
  const data = req.body;
  console.log('WhatsApp webhook received:', data);
  io.emit('new_message', {
    ...data,
    source: 'whatsapp'
  });
  res.status(200).send('OK');
});

app.post('/api/webhook/imessage', (req, res) => {
  const data = req.body;
  console.log('iMessage webhook received:', data);
  io.emit('new_message', {
    ...data,
    source: 'imessage'
  });
  res.status(200).send('OK');
});

app.post('/api/webhook/voiceflow', (req, res) => {
  const data = req.body;
  console.log('VoiceFlow webhook received:', data);
  io.emit('voiceflow_event', data);
  res.status(200).send('OK');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
}); 