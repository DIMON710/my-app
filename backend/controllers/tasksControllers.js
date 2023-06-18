const ApiError = require('../error/ApiError')
const {Tasks} = require('../models/models')
class TasksControllers {
    async addNew(req, res, next) {
        try {
            const {name, body} = req.body
            if (!name && !body) {
                return next(ApiError.badRequest('Не задан ID'))
            }
            const task = await Tasks.create({name, body})
            return res.json(task)
        } catch (e) {
            return next(ApiError.internal(e))
        }
    }
    async getAllForSocket() {
        try {
            let tasks
            tasks = await Tasks.findAndCountAll()
            return tasks
        } catch (e) {
            console.log(e)
            return e
        }
    }
    async getAll(req, res, next) {
        try {
            let {name, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            let tasks
            if (name)
                tasks = await Tasks.findAndCountAll({where: {name}, limit, offset})
            if (!name)
                tasks = await Tasks.findAndCountAll() // {limit, offset}
            return res.json(tasks)
        } catch (e) {
            return next(ApiError.internal(e))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            if (!id) {
                return next(ApiError.badRequest('Не задан ID'))
            }
            const task = await Tasks.findOne({where: {id}})
            res.json(task);
        } catch (e) {
            return next(ApiError.internal(e))
        }
    }

    async setTask(req, res, next) {
        try {
            let {id, val} = req.body
            if (!id) {
                return next(ApiError.badRequest('Не задан ID'))
            }
            let updateTask;
            if (val)
                updateTask = await Tasks.update({complete: true}, {where: {id}})
            else
                updateTask = await Tasks.update({complete: false}, {where: {id}})
            res.json(Boolean(updateTask[0]))

        } catch (e) {
            return next(ApiError.internal(e))
        }
    }

    async deleteTask(req, res, next) {
        try {
            const {id} = req.params
            if (!id) {
                return next(ApiError.badRequest('Не задан ID'))
            }
            const task = await Tasks.destroy({where: {id}})
            res.json(Boolean(task))
        } catch (e) {
            return next(ApiError.internal(e))
        }
    }
}

module.exports = new TasksControllers()