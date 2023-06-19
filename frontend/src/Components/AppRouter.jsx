import React, {useContext, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Prime from "../Pages/Prime.jsx";
import Lobby from "../Pages/Lobby.jsx";
import Notes from "../Pages/Notes/Notes.jsx";
import Note from "../Pages/Note.jsx";
import NewNote from "../Pages/NewNote.jsx";
import Auth from "../Pages/Auth/Auth.jsx";
import {Context} from "../Context/index.jsx";
import {useLogin} from "../Hooks/useLogin.js";
import Loader from "./UI/Loader/Loader.jsx";

const AppRouter = () => {
    const {IsAuth, IsLoading} = useContext(Context)
    const [user] = IsAuth;
    const [load, setLoad] = IsLoading;
    const [auth] = useLogin()
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            const localAuth = JSON.parse(localStorage.getItem('auth'))
            auth(localAuth.name, localAuth.password)
            setLoad(false)
        }
        setLoad(false)
    }, [])
    if (load) {
        return <Loader/>
    }
    return (
            <Routes>
                <Route path='/' element={<Prime/>}>
                    {user.auth
                        ? <>
                            <Route index element={<Lobby/>}/>
                            <Route path='notes' element={<Navigate to='/notes/1'/>}/>
                            <Route path='notes/:page' element={<Notes/>}/>
                            <Route path='note/:id' element={<Note/>}/>
                            <Route path='/new-note' element={<NewNote/>}/>
                            <Route path='*' element={<Navigate to='/'/>}/>
                        </>
                        : <>
                            <Route index element={<Lobby/>}/>
                            <Route path='auth' element={<Auth/>}/>
                            <Route path='*' element={<Navigate to='auth'/>}/>
                        </>
                    }
                </Route>
            </Routes>
    );
};

export default AppRouter;