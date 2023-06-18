const Router = require('express')
const router = new Router()
const tasksControllers = require('../controllers/tasksControllers')
router.post('/add-new', tasksControllers.addNew)
router.get('/all', tasksControllers.getAll)
router.get('/get-one/:id', tasksControllers.getOne)
router.put('/change', tasksControllers.setTask)
router.delete('/delete/:id', tasksControllers.deleteTask)
module.exports = router