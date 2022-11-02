import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setNotAuth} from "../../store/userSlice";
import {setSearch} from "../../store/frontSlice";
import {API_URL} from "../../config";

const Navbar = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const searchName = useAppSelector(state => state.front.searchName)
    const user = useAppSelector(state => state.user.user?.user)
    const avatar = user?.avatar ? `${API_URL + user?.avatar}` : './assets/images/avatar.png'
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userLogout = (e: any) => {
        e.preventDefault()
        dispatch(setNotAuth())
        navigate('/login')
    }
    return (
        <div className="container">
            <div className="navbar">
                <img src={`./assets/images/mern-logo.png`} alt="logo" className="header-logo"/>
                <div className="navbar-title"><NavLink to="/">MERN CLOUD</NavLink></div>
                {!isAuth && <div className="navbar-button navbar-login"><NavLink to="/login">Login</NavLink></div>}
                {!isAuth &&<div className="navbar-button navbar-registration"><NavLink to="/registration">Registration</NavLink></div>}
                {isAuth && <input type="text" placeholder='Enter file name' value={searchName} onChange={e => dispatch(setSearch(e.target.value))} className="navbar-search"/>}
                {isAuth && <div className="user-name">{user?.email}</div>}
                {isAuth && <button className="navbar-button navbar-login" onClick={e => userLogout(e)}>Logout</button>}
                {isAuth &&
                    <NavLink to='/profile'>
                        <img src={avatar} className='navbar-avatar' alt="avatar"/>
                    </NavLink>}
            </div>
        </div>
    );
};

export default Navbar;