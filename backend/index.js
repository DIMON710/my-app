require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');
const sequelize = require('./db.js');
const cors = require('cors');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const TasksControllers = require('./controllers/tasksControllers')
const PORT = process.env.PORT || 5000;
const CLIENT = process.env.CLIENT;
const ssl = require('ssl-express-www');
const app = express();
app.use(ssl);
app.use(cors());

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const server = require("http").Server(app);
const io = socketIO(server, {
    cors: {
        origin: CLIENT,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('setTasks', (data) => {
        io.emit('getTasks', data)
    })
    socket.on('test', (page) => {
        TasksControllers.getAllForSocket(10, page).then((response) => {
            console.log(page)
            socket.emit('testEm', response)
        })
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, () => console.log('SERVER WORKING ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}
startApp();
