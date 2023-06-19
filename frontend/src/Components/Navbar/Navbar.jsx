import React, {useContext, useEffect, useRef} from 'react';
import cl from './Navbar.module.scss';
import './Circle.scss';
import Li from "../UI/Li/Li.jsx";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Context} from "../../Context/index.jsx";
const Navbar = () => {
    const {IsAuth, Anim} = useContext(Context)
    const [anim, setAnim] = Anim;
    const location = useLocation();
    const notesRef = useRef(null);
    const newNoteRef = useRef(null);
    const authRef = useRef(null);
    useEffect(() => {
        if (location.pathname.split('/')[1] === 'notes' && user.auth) {
            setAnim({width: notesRef.current.offsetWidth + 20, left: notesRef.current.offsetLeft - 10})
        } else if (location.pathname.split('/')[1] === 'new-note' && user.auth) {
            setAnim({width: newNoteRef.current.offsetWidth + 20, left: newNoteRef.current.offsetLeft - 10})
        } else if (location.pathname.split('/')[1] === 'auth') {
            setAnim({width: authRef.current.offsetWidth + 20, left: authRef.current.offsetLeft - 10})
        }
    }, [])
    const back = () => {
      setAnim({width: 25, left: 15})
    }
    const [user, setUser] = IsAuth;
    const active = (e) => {
        setAnim({width: e.target.offsetWidth + 20, left: e.target.offsetLeft - 10})
    }
    const logout = () => {
        setUser({person: '', auth: false});
        localStorage.removeItem("auth")
        back();
        navigate('/');
    }
    
    const navigate = useNavigate()
    return (
        <div className={cl.navbar}>
            <div onClick={() => setAnim({width: 25, left: 15})} className='shadow'><NavLink to='/'/></div>
            <div className='circle' style={{width: anim.width, left: anim.left}}></div>
          <ul>
              {user.auth
                ?<>
                  <Li myref={notesRef} onClick={active} link={'notes'}>Все задание</Li>
                  <Li myref={newNoteRef} onClick={active} link={'new-note'}>Дать задание</Li>
                  <li><a style={{cursor: 'pointer'}} onClick={logout}>Выйти</a></li></>
                :
                  <Li myref={authRef} onClick={active} link={'auth'}>Войти</Li>}
          </ul>
        </div>
    );
};

export default Navbar;