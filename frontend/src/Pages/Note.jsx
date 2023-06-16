import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../Hooks/useFetching.js";
import TasksService from "../API/TasksService.js";
import {useParams} from "react-router-dom";
import Loader from "../Components/UI/Loader/Loader.jsx";
import {Context} from "../Context/index.jsx";

const Note = () => {
    const {Anim} = useContext(Context)
    const [anim, setAnim] = Anim;
    const [item, setItem] = useState({});
    const [fetchTask, isTaskLoading, taskError] = useFetching(async (id) => {
        const response = await TasksService.getOne(id);
        console.log(response.data)
        setItem(response.data)
    })
    const params = useParams()
    useEffect(() => {
        fetchTask(params.id)
        setAnim({width: 25, left: 15})
    }, [])
    return (
        <div>
            {isTaskLoading
                ? <Loader/>
                : <div>
                    <h2>{item.name}</h2>
                    <h3>{item.body}</h3>
                </div>
            }
        </div>
    );
};

export default Note;