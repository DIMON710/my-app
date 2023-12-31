import './App.scss'
import {useState} from "react";
import {Context} from "../../Context";
import AppRouter from "../AppRouter.jsx";
import {HashRouter} from "react-router-dom";
import io from "socket.io-client";

const URL = 'https://dimension-server-for-my-app.onrender.com';
// const URL = 'http://localhost:5000';
const socket = io(URL);
function App() {
    const [user, setUser] = useState({person: '', auth: false})
    const [tasks, setTasks] = useState([])
    const [anim, setAnim] = useState({width: 25, left: 0})
    const [load, setLoad] = useState(true)
    const context = {
        IsAuth: [user, setUser],
        Tasks: [tasks, setTasks],
        Anim: [anim, setAnim],
        IsLoading: [load, setLoad],
        socket
    }
    return (
        <div className="App">
            <Context.Provider value={context}>
                <HashRouter>
                    <AppRouter/>
                </HashRouter>
            </Context.Provider>
        </div>
    )
}

export default App
