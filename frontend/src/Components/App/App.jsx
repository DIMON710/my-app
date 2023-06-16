import './App.scss'
import {useState} from "react";
import {Context} from "../../Context";
import AppRouter from "../AppRouter.jsx";
import {createHashHistory} from "history";
import {BrowserRouter} from "react-router-dom";

function App() {
    const hashHistory = createHashHistory();
    const [user, setUser] = useState({person: '', auth: false})
    const [tasks, setTasks] = useState([])
    const [anim, setAnim] = useState({width: 25, left: 15})
    const [load, setLoad] = useState(true)
    const context = {
        IsAuth: [user, setUser],
        Tasks: [tasks, setTasks],
        Anim: [anim, setAnim],
        IsLoading: [load, setLoad]
    }
    return (
        <div className="App">
            <Context.Provider value={context}>
                <BrowserRouter history={hashHistory}>
                    <AppRouter/>
                </BrowserRouter>
            </Context.Provider>
        </div>
    )
}

export default App
