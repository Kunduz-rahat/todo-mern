const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
require("dotenv").config()
const tasksRouter = require('./routes/tasksRouter')
const Tasks = require('./models/taskModel')




const server = express()
server.use(express.json())  /// мидlвейр чтобы использовать боди
server.use(cors()) 
server.use(morgan())


mongoose.connect(process.env.MONGO_URL).then(()=>console.log(chalk.blue('DB is connected')))
  .catch(()=> console.log(chalk.red('DB not connected')))
server.use("/api/tasks", tasksRouter)

server.use(express.static(path.resolve("client/build")))
server.get("/*", (req, res)=>{
  res.sendFile(path.resolve("client/build/index.html"))
})

Tasks.find({}).exec((error, list)=>{
  console.log(list)
})
server.listen(process.env.PORT || 8000, () => {
  console.log('server in started')
}) // запускаем наш сервер