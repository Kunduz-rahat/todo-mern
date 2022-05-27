const Tasks = require("../models/taskModel")

const getAllTasks = async (req, res) => {
  const data = await Tasks.find({status: 'new'})
  const filteredData = data.filter(item => !item._isDeleted)
    .map(item => {
      return {
        id: item._id,
        title: item.title,
        status: item.status
      }
    })
  res.json(filteredData)
}

const getByTime =async (req, res) => {
  const data =await Tasks.find({})
  const duration = {
    "day": 1000 * 60 * 60 * 24,
    "week": 1000 * 60 * 60 * 24 * 7,
    "month": 1000 * 60 * 60 * 24 * 30,
    "year": 1000 * 60 * 60 * 24 * 365
  }
  const filteredData = data.filter(item => +new Date() - item._createdAt < duration[req.params.timespan])
  res.json(filteredData)
}

const addTask = async (reg, res) => {
  try {
    const newTask = new Tasks({
      title: reg.body.title
    })
    const savedTask = await newTask.save()
    res.json(savedTask)
  } catch (e) {
    res.status(401).json({"message": "Ошибка сохранения"})
  }
}

const deletedTask = async (req, res) => {
  const updatedTask = await Tasks.findOneAndUpdate(
    {_id: req.params.id},
    {_isDeleted: true, _deletedAt: +new Date()},
    {new: true})

  res.json(updatedTask)
}


const updateTask = async (req, res) => {
  const statuses = ["new", "in progress", "done", "blocked"]
  if (statuses.includes(req.body.status)) {
    const updatedStatus = await Tasks.findOneAndUpdate(
      {_id: req.params.id},
      {status: req.body.status},
      {new: true}
    )
    res.json(updatedStatus)
  } else {
    res.status(501).json({"status": "error", "message": "incorrect status"})
  }

}

module.exports = {getAllTasks, getByTime, addTask, deletedTask, updateTask}