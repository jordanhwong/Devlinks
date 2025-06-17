const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('DevLinks API');
});

app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);

module.exports = app;