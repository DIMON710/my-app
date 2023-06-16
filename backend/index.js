require('dotenv').config();
const express = require('express');
const sequelize = require('./db.js');
const cors = require('cors');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const PORT = process.env.PORT || 5000;
// const CLIENT = 'https://dimension-my-app.onrender.com';
const CLIENT = 'http://localhost:5173';

const app = express();
app.use(cors({
    origin: CLIENT
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());
app.use('/api', router);

app.use(errorHandler)
const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,() => console.log('SERVER WORKING ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}
startApp();
