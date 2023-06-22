import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../Context/index.jsx";
import NoteItem from "../../Components/NoteItem/NoteItem.jsx";
import cl from './Notes.module.scss'
import TasksService from "../../API/TasksService";
import {useFetching} from "../../Hooks/useFetching";
import Loader from "../../Components/UI/Loader/Loader.jsx";
import Select from "../../Components/UI/Select/Select.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../Components/UI/Button/Button.jsx";

const Notes = () => {
    const {Tasks, IsAuth, socket} = useContext(Context)
    const [isAuth] = IsAuth;
    const [tasks, setTasks] = Tasks
    const [filter, setFilter] = useState(tasks)
    const [select1, setSelect1] = useState(localStorage.getItem('select1') ? localStorage.getItem('select1') : 'all');
    const [select2, setSelect2] = useState(localStorage.getItem('select2') ? localStorage.getItem('select2') : 'all');
    const [countPage, setCountPage] = useState([1]);
    const params = useParams();
    const navigate = useNavigate();
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

    const [fetchTasks, isTasksLoading, tasksError] = useFetching(async (limit, page) => {
        const response = await TasksService.getAll(limit, page);
        const countPage = Math.ceil(response.data.count/10);
        const pageArr = [];
        for (let i = 0; i < countPage; i++) {
            pageArr.push(i+1);
        }
        setCountPage(pageArr);
        setTasks(response.data.rows);
    })
    useEffect(() => {
        fetchTasks(10, params.page)
    }, [params.page])
    useEffect(() => {
        socket.on('getTasks', () => {
            socket.emit('test', location.hash.at(-1))
            socket.on('testEm', (data) => {
                const countPage = Math.ceil(data.count/10);
                const pageArr = [];
                for (let i = 0; i < countPage; i++) {
                    pageArr.push(i+1);
                }
                setCountPage(pageArr);
                if (data.rows !== undefined){
                    if (data.rows.length === 0) {
                        navigate(`/notes/${countPage}`)
                    }
                    setTasks(data.rows);
                }
            });
        });
    },[socket]);
    return (
        <>
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
            {!isTasksLoading && countPage.length > 1 &&
                <div className={cl.pagination}>
                    {countPage.map((el) => (
                        <Button style={el === +params.page ? {borderColor: '#fff'} : {}} onClick={() => {
                            navigate(`/notes/${el}`)
                        }} key={el}>{el}</Button>
                    ))}
                </div>
            }
    </>
    );
};

export default Notes;