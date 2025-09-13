// bakend/server.js
const express = require('express');
const dotenv = require('dotenv')

// Importing the database connection function
const connectdb = require('./config/db')


const cors = require('cors')


// Importing route handlers
const authroutes = require('./routes/authRoutes')
const taskroutes = require('./routes/taskRoutes')
dotenv.config()
connectdb()


// Creating an Express application
const app = express();
app.use(express.json())
app.use(cors())


// Defining routes
app.use('/api/auth', authroutes)
app.use('/api/tasks', taskroutes)

const PORT = process.env.PORT || 4000;



// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});