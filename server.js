const express = require('express');
const db = require('./config/connection');
const Thoughts = require('./models/thoughts');
const Reactions = require('./models/thoughts');
const Users = require('./models/users');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require('./routes/user-routes');
const thoughtRoutes = require('./routes/thought-routes');
const reactionRoutes = require('./routes/reaction-routes');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/thoughts/:thoughtId/reactions', reactionRoutes);


app.get('/api/thoughts', (req, res) => {
  Thoughts.find()
    .then((thoughts) => {
      res.json(thoughts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.post('/api/thoughts', (req, res) => {
  Thoughts.create(req.body)
    .then((thought) => {
      res.json(thought);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.delete('/api/thoughts', (req, res) => {
  Thoughts.deleteMany({})
    .then(() => {
      res.json({ message: 'All thoughts deleted successfully' });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.get('/api/reactions', (req, res) => {
  Reactions.find({})
    .then((reactions) => {
      res.json(reactions);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.post('/api/reactions', (req, res) => {
  Reactions.create(req.body)
    .then((reaction) => {
      res.json(reaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.delete('/api/reactions', (req, res) => {
  Reactions.deleteMany()
    .then(() => {
      res.json({ message: 'All reactions deleted.' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get('/api/users', (req, res) => {
  Users.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.post('/api/users', (req, res) => {
  Users.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.delete('/api/users', (req, res) => {
  Users.deleteMany({})
    .then(() => {
      res.json({ message: 'All users have been deleted.' });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
