import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../Context/index.jsx";
import NoteItem from "../../Components/NoteItem/NoteItem.jsx";
import cl from './Notes.module.scss'
import TasksService from "../../API/TasksService";
import {useFetching} from "../../Hooks/useFetching";
import Loader from "../../Components/UI/Loader/Loader.jsx";
import Select from "../../Components/UI/Select/Select.jsx";

const Notes = () => {
    const {Tasks, Anim, IsAuth} = useContext(Context)
    const [anim, setAnim] = Anim;
    const [isAuth] = IsAuth;
    const [tasks, setTasks] = Tasks
    const [filter, setFilter] = useState(tasks)
    const [select1, setSelect1] = useState(localStorage.getItem('select1') ? localStorage.getItem('select1') : 'all');
    const [select2, setSelect2] = useState(localStorage.getItem('select2') ? localStorage.getItem('select2') : 'all');
    useEffect(() => {
        let fil = tasks
        if (select1 === 'all') {
            localStorage.setItem('select1', 'all')
        } else if (select1 === 'no') {
            fil = [...tasks].filter((item) => !item.complete)
            localStorage.setItem('select1', 'no')
        } else if (select1 === 'yes') {
            fil = [...tasks].filter((item) => item.complete)
            localStorage.setItem('select1', 'yes')
        }

        if (select2 === 'all') {
            setFilter(fil)
            localStorage.setItem('select2', 'all')
        } else if (select2 === 'your') {
            setFilter([...fil].filter((item) => item.name === isAuth.person))
            localStorage.setItem('select2', 'your')
        } else if (select2 === 'forYou') {
            setFilter([...fil].filter((item) => item.name !== isAuth.person))
            localStorage.setItem('select2', 'forYou')
        }
    }, [select1, select2, tasks])

    const [fetchTasks, isTasksLoading, tasksError] = useFetching(async () => {
        const response = await TasksService.getAll();
        setTasks([...response.data.rows].sort((a, b) => b.id - a.id))
    })
    useEffect(() => {
        fetchTasks()
    }, [])
    return (
        <div className={cl.notes}>
            <div style={{display: 'flex', gap: 15, alignSelf: 'flex-start', width: '100%'}}>
                <Select value={select1} onChange={e => setSelect1(e.target.value)} options={[
                    {value: 'all', name: "Все"},
                    {value: 'no', name: "Не выполненные"},
                    {value: 'yes', name: "Выполненные"},
                ]}/>
                <Select value={select2} onChange={e => setSelect2(e.target.value)} options={[
                    {value: 'all', name: "Все"},
                    {value: 'your', name: "Твои"},
                    {value: 'forYou', name: "Тебе"},
                ]}/>
            </div>
            {isTasksLoading
                ? <Loader/>
                : (filter.length
                    ? filter.map(item => {
                        return <NoteItem key={item.id} item={item}></NoteItem>
                    })
                    : <h2>Здесь пока ничего нет</h2>)
            }
            {tasksError && <h2>{tasksError}</h2>}
        </div>
    );
};

export default Notes;