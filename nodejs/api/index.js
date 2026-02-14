const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let items = [];
let users = [];
let itemIdCounter = 0;
let userIdCounter = 0;

app.get('/', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), version: '1.0.0', uptime: process.uptime() });
});

app.get('/api/items', (req, res) => {
  res.json({ items, count: items.length });
});

app.post('/api/items', (req, res) => {
  const item = { id: ++itemIdCounter, ...req.body, created_at: new Date().toISOString() };
  items.push(item);
  res.status(201).json(item);
});

app.get('/api/users', (req, res) => {
  res.json({ users, count: users.length });
});

app.post('/api/users', (req, res) => {
  const user = { id: ++userIdCounter, ...req.body, created_at: new Date().toISOString() };
  users.push(user);
  res.status(201).json(user);
});

module.exports = app;
