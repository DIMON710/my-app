import React, {useState} from 'react';
import Input from "../../Components/UI/Input/Input.jsx";
import Button from "../../Components/UI/Button/Button.jsx";
import cl from './Auth.module.scss';
import {useNavigate} from "react-router-dom";
import {useLogin} from "../../Hooks/useLogin.js";

const Auth = () => {
    const [login, setLogin] = useState({name: '', password: ''})
    const navigate = useNavigate()
    const [color, setColor] = useState('#000');
    const [enter] = useLogin();
    const loginFunc = () => {
        const auth = enter(login.name, login.password);
        if (auth) {
            navigate('/')
        } else {
            setColor('red');
        }
    }
    return (
        <div className={cl.auth}>
            <Input type='login' onChange={(e) => setLogin({...login, name: e.target.value})} placeholder='Логин'/>
            <Input type='password' onChange={(e) => setLogin({...login, password: e.target.value})}
                   placeholder='Пароль'/>
            <Button style={{borderColor: color}} onClick={loginFunc}>Войти</Button>
        </div>
    );
};

export default Auth;