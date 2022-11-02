import React, {useEffect} from 'react';
import {useInput} from "../../hooks/UseInput";
import {useAppDispatch} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {useUserLoginMutation} from "../../store/api/apiSlice";
import {setAuth} from "../../store/userSlice";

const Login = () => {
    const email = useInput('', {isEmpty: true, minLenght: 8, isEmail: true})
    const password = useInput('', {isEmpty: true, minLenght: 8, maxLenght: 16, isPassword: true})
    const [userLogin, {data, error, isLoading, isError, isSuccess}] = useUserLoginMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        await userLogin({email: email.value, password: password.value})
    }

    useEffect(() => {
        if (isSuccess && data) {
            // console.log(data)
            dispatch(setAuth({isAuth: true, user: data}))
            navigate('/disk')
        }
    }, [isSuccess])

    if (isError) {
        console.log(error)
    }
    return (
        <div className="form">
            <div className="form-title">Login</div>

            {(email.isDirty && email.isError) && <div className="validation-error">{email.error}</div>}
            <div className="validate-input" data-validate="Valid email is: a@b.c">
                <input onBlur={event => email.onBlur(event)} value={email.value}
                       onChange={event => email.onChange(event)} className="input" type="text"
                       name="email"
                       placeholder='Email'/>
            </div>

            {(password.isDirty && password.isError) && <div className="validation-error">{password.error}</div>}
            <div className="validate-input" data-validate="Valid email is: a@b.c">
                <input onBlur={event => password.onBlur(event)} value={password.value}
                       onChange={event => password.onChange(event)} className="password-input" type="password"
                       name="password"
                       placeholder='Password'/>
            </div>
            <div className="btn-container">
                <div className="form-button">
                    <button disabled={!email.isActiveInput || !password.isActiveInput} onClick={(e) => handleLogin(e)}
                            className="button">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;