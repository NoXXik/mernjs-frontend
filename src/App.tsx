import React, {useEffect} from 'react';
import Navbar from "./components/navbar/Navbar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import Home from "./components/Home";
import {useAppDispatch} from "./hooks/redux";
import {IUserInitialState, setAuth, setNotAuth} from "./store/userSlice";
import {useUserAuthQuery} from "./store/api/apiSlice";
import Disk from "./components/disk/Disk";
import Profile from "./components/Profile";

function App() {
    const dispatch = useAppDispatch()
    const user = JSON.parse(localStorage.getItem("user") || "{}") as IUserInitialState
    const {data, isError, isSuccess} = useUserAuthQuery('')
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setAuth({user: user.user, isAuth: user.isAuth}))
        if (isSuccess) {
            dispatch(setAuth({user: data, isAuth: true}))
            navigate('/disk')
        }
        if(isError) {
            console.log("error")
            dispatch(setNotAuth())
            localStorage.clear()
        }
    }, [isSuccess, isError])

    return (
        <>
            <header><Navbar/></header>
            <section className="main">
                <div className="container">
                    {!user.isAuth ?
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/registration' element={<Registration/>}/>
                        </Routes>
                        :
                        <Routes>
                            <Route path='/disk' element={<Disk/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path='/' element={<Home/>}/>
                        </Routes>
                    }
                </div>
            </section>
        </>
    );
}

export default App;
