const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const { toParse } = require('./parser')
const { cron } = require('node-cron')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


//front
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  
  cron.schedule('20, * * * *', () =>  {
    console.log('running a task every minute');
    toParse;
  });

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )

} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
