const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


const userRoutes = require('./routes/user-routes');
const thoughtRoutes = require('./routes/thought-routes');
const reactionRoutes = require('./routes/reaction-routes');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/thoughts/:thoughtId/reactions', reactionRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
