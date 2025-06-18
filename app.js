const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');

const errorHandler = require('./middleware/errorHandler');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests, please try again later.'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);

app.use(errorHandler);

module.exports = app;