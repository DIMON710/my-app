const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Tasks = sequelize.define('tasks',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    body: {type: DataTypes.STRING},
    complete: {type: DataTypes.BOOLEAN, defaultValue: false}
})
module.exports = {
    Tasks
}