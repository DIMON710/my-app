const ApiError = require('../error/ApiError')
const {Tasks} = require('../models/models')
const { Op } = require('sequelize');
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
    async getAllForSocket(limit, page) {
        try {
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            let tasks
            tasks = await Tasks.findAndCountAll({order: [['id', 'DESC']], limit, offset})
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
                tasks = await Tasks.findAndCountAll({order: [['id', 'DESC']], limit, offset})
            return res.json(tasks)
        } catch (e) {
            return next(ApiError.internal(e))
        }
    }

    async getSort(req, res, next) {
        try {
            let {name, complete, page, limit, negation} = req.query
            if (complete) {
               complete = JSON.parse(complete)
            }
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            let tasks
            if (negation) {
                if (name && complete !== undefined) {
                    tasks = await Tasks.findAndCountAll({order: [['id', 'DESC']], where: {name: {[Op.ne]: name}, complete}, limit, offset})
                    return res.json(tasks)
                } else if (name) {
                    tasks = await Tasks.findAndCountAll({order: [['id', 'DESC']], where: {name: {[Op.ne]: name}}, limit, offset})
                    return res.json(tasks)
                }
            } else {
                if (name && complete !== undefined) {
                    tasks = await Tasks.findAndCountAll({order: [['id', 'DESC']], where: {name, complete}, limit, offset})
                    return res.json(tasks)
                } else if (name) {
                    tasks = await Tasks.findAndCountAll({order: [['id', 'DESC']], where: {name}, limit, offset})
                    return res.json(tasks)
                }
            }

            if (complete !== undefined) {
                tasks = await Tasks.findAndCountAll({order: [['id', 'DESC']], where: {complete}, limit, offset})
                return res.json(tasks)
            }
            tasks = await Tasks.findAndCountAll({order: [['id', 'DESC']], limit, offset})
            return res.json(tasks)
        } catch(e) {
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