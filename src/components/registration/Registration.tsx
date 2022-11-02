import React, {useEffect} from 'react';
import {useInput} from "../../hooks/UseInput";
import {useUserRegistrationMutation} from "../../store/api/apiSlice";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const name = useInput('', {isEmpty: true, minLenght: 2})
    const surname = useInput('', {isEmpty: true, minLenght: 2})
    const email = useInput('', {isEmpty: true, minLenght: 5, isEmail: true})
    const password = useInput('', {isEmpty: true, minLenght: 8, maxLenght: 16, isPassword: true})
    const confirmPassword = useInput('', {isEmpty: true, minLenght: 8, maxLenght: 16, isPassword: true, confirmPassword: password.value})
    const navigate = useNavigate()
    const [userRegistration, {isSuccess, isError, isLoading, error, data}] = useUserRegistrationMutation()

    const handleRegistration = async (e: any) => {
        e.preventDefault()
        await userRegistration({name: name.value, surname: surname.value, email: email.value, password: password.value})
    }

    useEffect(() => {
        if (isSuccess && data) {
            // console.log(data)
            navigate('/login')
        }
    }, [isSuccess])

    if (isError) {
        console.log(error)
    }

    return (
        <div className="form">
            <div className="form-title">Registration</div>

            {(name.isDirty && name.isError) && <div className="validation-error">{name.error}</div>}
            <div className="validate-input" data-validate="Valid email is: a@b.c">
                <input onBlur={event => name.onBlur(event)} value={name.value}
                       onChange={event => name.onChange(event)} className="input" type="text"
                       name="name"
                       placeholder='Your name'/>
            </div>

            {(surname.isDirty && surname.isError) && <div className="validation-error">{surname.error}</div>}
            <div className="validate-input" data-validate="Valid email is: a@b.c">
                <input onBlur={event => surname.onBlur(event)} value={surname.value}
                       onChange={event => surname.onChange(event)} className="input" type="text"
                       name="surname"
                       placeholder='Your surname'/>
            </div>

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

            {(confirmPassword.isDirty && confirmPassword.isError) && <div className="validation-error">{confirmPassword.error}</div>}
            <div className="validate-input" data-validate="Valid email is: a@b.c">
                <input onBlur={event => confirmPassword.onBlur(event)} value={confirmPassword.value}
                       onChange={event => confirmPassword.onChange(event)} className="password-input" type="password"
                       name="confirmPassword"
                       placeholder='Confirm the password'/>
            </div>

            <div className="btn-container">
                <div className="form-button">
                    <button disabled={!email.isActiveInput || !password.isActiveInput || !confirmPassword.isActiveInput || !name.isActiveInput || !surname.isActiveInput} onClick={(e) => handleRegistration(e)}
                            className="button">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Registration;