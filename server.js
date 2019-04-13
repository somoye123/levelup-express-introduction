const express = require('express');
const artisteRouter = require('./artisteRouter');
const languageRouter = require('./languageRouter');

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(express.urlencoded({ extended: false }));

// Add middleware for request JSON body
app.use(express.json());

// Add logger middleware
app.use((req, res, next) => {
  const { url, method } = req;
  console.log(`Got a ${method} request for ${url} at ${new Date()}`);
  next();
});

app.use('/artiste', artisteRouter);

app.use('/language', languageRouter);

// Error middleware with 4 arguments
app.use((err, req, res, next) => {
  console.log('😭 we got an error', err);

  res.status(500).json({
    status: 'error',
    message: err.message,
  });
});

const port = 6004;

app.listen(port).on('listening', () => {
  console.log('🚀 are live on ' + port);
});
