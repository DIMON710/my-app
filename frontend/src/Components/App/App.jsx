import './App.scss'
import {useState} from "react";
import {Context} from "../../Context";
import AppRouter from "../AppRouter.jsx";

function App() {
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
                <AppRouter/>
            </Context.Provider>
        </div>
    )
}

export default App
