const express = require('express')
const app = express()

app.use(express.json())

let tasks = [
  { id: 1, title: 'Learn GitHub Actions', completed: true },
  { id: 2, title: 'Write Automated Tests', completed: false }
]

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks)
})

app.post('/tasks', (req, res) => {
  const { title } = req.body
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' })
  }

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    completed: false
  }

  tasks.push(newTask)
  res.status(201).json(newTask)
})

module.exports = app
