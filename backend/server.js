const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskManager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Task Schema and Model
const taskSchema = new mongoose.Schema({
    name: String,
    owner: String,
    start: String,
    end: String,
    description: String,
    priority: String,
    category: String,
    subtasks: Array,
    dependencies: Array,
    status: String,
});

const Task = mongoose.model('Task', taskSchema);

// Routes
// POST request to add a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET request to fetch all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE request to delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT request to update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).send();
        }
        res.send(updatedTask);
    } catch (error) {
        res.status(400).send(error);
    }
});

const authRoutes = require('./routes/auth'); // Import auth routes
app.use('/api/auth', authRoutes); // Use auth routes


// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
