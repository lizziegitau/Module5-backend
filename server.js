require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user')
const meditationRoutes = require('./routes/meditation')
const journalRoutes = require('./routes/journal')
const authRoutes = require('./routes/auth')

//express app
const app = express()
  
//middleware
app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/meditation', meditationRoutes)
app.use('/journal', journalRoutes)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  db.once('open', () => {
    console.log('Connected to MongoDB database.')
  })

//listen for requests
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})