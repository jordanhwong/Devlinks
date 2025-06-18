const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);

app.use(errorHandler);

module.exports = app;