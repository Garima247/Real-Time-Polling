const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const pollRoutes = require('./routes/pollRoutes');
const { submitVote } = require('./controllers/voteController');
const { getPollVotes } = require('./controllers/voteController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);

// Special vote route that will be attached to the server with socket.io instance
const setupVoteRoutes = (io) => {
  app.post('/api/votes', (req, res) => {
    submitVote(req, res, io);
  });
  
  app.get('/api/votes/:pollId', getPollVotes);
};

// Error handling middleware
app.use(errorHandler);

module.exports = { app, setupVoteRoutes };