const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.post('/extract', (req, res) => {
  const { text } = req.body
  // Placeholder: return some dummy tasks
  const tasks = ['Task 1', 'Task 2', 'Task 3']
  res.json({ tasks })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})