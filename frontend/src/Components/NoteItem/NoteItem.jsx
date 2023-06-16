import React, {useContext} from 'react';
import cl from './NoteItem.module.scss'
import Button from "../UI/Button/Button.jsx";
import {Context} from '../../Context';
import {useFetching} from "../../Hooks/useFetching.js";
import TasksService from "../../API/TasksService.js";
import {useNavigate} from "react-router-dom";
const NoteItem = ({item}) => {
    const {Tasks} = useContext(Context)
    const [notes, setNotes] = Tasks
    const navigate = useNavigate()
    const index = notes.findIndex(note => note.id === item.id);
    const [putTasks, isPutTasksLoading, putTasksError] = useFetching(async (id, val) => {
        const response = await TasksService.setTask(id, val);
        console.log(response)
    })
    const [fetchTasks, isTasksLoading, tasksError] = useFetching(async (id) => {
        const response = await TasksService.deleteTask(id);
        console.log(response)
    })

    const completeFunc = (e) => {
        e.stopPropagation()
        setNotes(notes.map((note, i) => i === index ? {...note, complete: !notes[index].complete} : note))
        putTasks(item.id, !item.complete)
    }
    const deleteFunc = (e) => {
        e.stopPropagation()
        setNotes(notes.filter((note, i) => i !== index))
            fetchTasks(item.id)
    }
    const toTask = () => {
        navigate(`/note/${item.id}`)
    }
    return (
        <div onClick={toTask} className={cl.item} style={{position: 'relative'}}>
            <div className="title">
                <h3>{item.name}</h3>
                <p style={item.complete ? {textDecoration: 'line-through'} : {}}>{item.body}</p>
            </div>
            <Button onClick={completeFunc} style={{width: 25, height: 25, color: '#fff', borderColor: '#fff', flexShrink: 0}}>{item.complete ? '-' : '✓'}</Button>
            {item.complete && <button className={cl.deleteBtn} onClick={deleteFunc}>X</button>}
        </div>
    );
};

export default NoteItem;