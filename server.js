const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 4000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Your routes for handling habits will go here...
const habits = []; // Temporary storage for habits (in-memory)

// Route to add a habit
app.post('/habits', (req, res) => {
  const newHabit = req.body;
  habits.push(newHabit);
  res.json(newHabit);
});

// Route to retrieve all habits
app.get('/habits', (req, res) => {
  res.json(habits);
});

// For all other routes, serve the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
