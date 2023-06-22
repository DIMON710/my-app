import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from './Navbar.module.scss';
import './Circle.scss';
import Li from "../UI/Li/Li.jsx";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Context} from "../../Context/index.jsx";
const Navbar = () => {
    const {IsAuth, Anim} = useContext(Context)
    const [burgerAnim, setBurgerAnim] = useState({});
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const [anim, setAnim] = Anim;
    const location = useLocation();
    const notesRef = useRef(null);
    const newNoteRef = useRef(null);
    const authRef = useRef(null);
    const burgerRef = useRef(null);
    useEffect(() => {
        if (window.innerWidth > 456) {
            if (location.pathname.split('/')[1] === 'notes' && user.auth) {
                setAnim({width: notesRef.current.offsetWidth + 20, left: notesRef.current.offsetLeft - 10})
            } else if (location.pathname.split('/')[1] === 'new-note' && user.auth) {
                setAnim({width: newNoteRef.current.offsetWidth + 20, left: newNoteRef.current.offsetLeft - 10})
            } else if (location.pathname.split('/')[1] === 'auth') {
                setAnim({width: authRef.current.offsetWidth + 20, left: authRef.current.offsetLeft - 10})
            } else if (location.pathname.at(-1) === '/') {
                setAnim({width: 25, left: 0})
            }
        } else {
            setAnim({width: 25, left: 0})
            if (location.pathname.split('/')[1] === 'notes' && user.auth) {
                setBurgerAnim({width: notesRef.current.offsetWidth + 20, left: notesRef.current.offsetLeft - 10, top: notesRef.current.offsetTop + 20})
            } else if (location.pathname.split('/')[1] === 'new-note' && user.auth) {
                setBurgerAnim({width: newNoteRef.current.offsetWidth + 20, left: newNoteRef.current.offsetLeft - 10, top: newNoteRef.current.offsetTop + 20})
            } else if (location.pathname.split('/')[1] === 'auth') {
                setAnim({width: authRef.current.offsetWidth + 20, left: authRef.current.offsetLeft - 10})
            } else if (location.pathname.at(-1) === '/') {
                setBurgerAnim({left: 123, width: 124, top: -50})
            }
        }
    }, [location.pathname])
    const back = () => {
      setAnim({width: 25, left: 0})
    }
    const [user, setUser] = IsAuth;
    const active = (e) => {
        e.stopPropagation();
        setTimeout(() => {
            setIsOpenBurger(false)
        }, 500)
        if (window.innerWidth > 456) {
            setAnim({width: e.target.offsetWidth + 20, left: e.target.offsetLeft - 10});
        } else {
            setBurgerAnim({width: e.target.offsetWidth + 20, left: e.target.offsetLeft - 10, top: e.target.offsetTop + 20})
        }
    }
    const logout = () => {
        setUser({person: '', auth: false});
        localStorage.removeItem("auth")
        back();
        navigate('/');
    }
    
    const navigate = useNavigate()
    return (
        <div className={cl.navbar} style={isOpenBurger ? {paddingBottom: 160} : {}} onClick={() => setIsOpenBurger(false)}>
            <div onClick={() => {
                setAnim({width: 25, left: 0})
                setBurgerAnim({left: 123, width: 124, top: -50})
                setIsOpenBurger(false);
            }} className='shadow'><NavLink to='/'/></div>
            <div className='circle' style={{width: anim.width, left: anim.left}}></div>
            <div className='circle burgerCir' style={isOpenBurger ? {width: burgerAnim.width, left: burgerAnim.left, top: burgerAnim.top} : {width: burgerAnim.width, left: burgerAnim.left, top: -200}}></div>
              <ul className={`${cl.burger} ${user.auth && cl.action} ${isOpenBurger && cl.active}`} style={{}}>
                  {user.auth
                      ?<>
                          <Li myref={notesRef} onClick={active} link={'notes'}>Все задание</Li>
                          <Li myref={newNoteRef} onClick={active} link={'new-note'}>Дать задание</Li>
                          <li><a style={{cursor: 'pointer'}} onClick={() => {
                              logout()
                              setBurgerAnim({left: 123, width: 124, top: -50})
                          }}>Выйти</a></li></>
                      :
                      <Li myref={authRef} onClick={active} link={'auth'}>Войти</Li>}
              </ul>
            {user.auth && <div ref={burgerRef} className={cl.burger__btn} onClick={(e) => {
                e.stopPropagation()
                if (!isOpenBurger) {
                    setAnim({width: e.target.offsetWidth + 20, left: e.target.offsetLeft - 10});
                } else {
                    setAnim({width: 25, left: 0});
                }
                setIsOpenBurger(!isOpenBurger);
            }}>|||</div>}
        </div>
    );
};

export default Navbar;