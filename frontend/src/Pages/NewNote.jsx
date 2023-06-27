import React, {useContext, useState} from 'react';
import TextArea from "../Components/UI/TextArea/TextArea.jsx";
import Button from "../Components/UI/Button/Button.jsx";
import {Context} from "../Context/index.jsx";
import {useFetching} from "../Hooks/useFetching.js";
import TasksService from "../API/TasksService.js";

const NewNote = () => {
    const {Tasks, IsAuth, Anim, socket} = useContext(Context)
    const [tasks, setTasks] = Tasks;
    const [user] = IsAuth;
    const [task, setTask] = useState('');
    const [fetchTasks, isTasksLoading, tasksError] = useFetching(async (name, body) => {
        const response = await TasksService.addNew(name, body);
        console.log(response.data);
    })
    const addTask = () => {
        if (task !== '') {
            fetchTasks(user.person, task).then( () => {
                socket.emit('setTasks', socket.id);
            });
            setTask('');
        }
    }
    return (
        <div>
            <TextArea value={task} onChange={(e) => setTask(e.target.value)} placeholder='Задание'/>
            <Button onClick={addTask}>Отправить</Button>
        </div>
    );
};

export default NewNote;