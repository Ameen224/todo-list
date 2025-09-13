// bakend/server.js
const express = require('express');
const dotenv= require ('dotenv')
const connectdb= require('./config/db')
const authroutes = require('./routes/authRoutes')
const taskroutes = require('./routes/taskRoutes')
const cors = require('cors')
dotenv.config()
connectdb()


console.log("JWT_SECRET from env: in server", process.env.JWT_SECRET);




const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/auth', authroutes)
app.use('/api/tasks', taskroutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});