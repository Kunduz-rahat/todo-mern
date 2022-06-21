const express = require('express')
const router = express.Router()
const {getAllTasks, getByTime, addTask, deletedTask, updateTask} = require('../controllers/tasks')


router.get("/", getAllTasks)

router.get("/:timespan", getByTime )

router.post("/", addTask )

router.delete("/:id",deletedTask )

router.put("/:id", updateTask )

module.exports = router