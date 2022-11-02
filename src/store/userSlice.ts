import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
    token: string,
    user: {
        id: number,
        email: string,
        diskSpace: number,
        usedSpace: number,
        avatar: string
    }
}

export interface IUserInitialState {
    user: IUser | null,
    isAuth: boolean,
}

const initialState: IUserInitialState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setAuth(state, action: PayloadAction<IUserInitialState>) {
            state.isAuth = action.payload.isAuth
            state.user = action.payload.user
            localStorage.setItem('user', JSON.stringify({user: action.payload.user, isAuth: action.payload.isAuth}))
        },
        setNotAuth(state) {
            state.isAuth = false
            state.user = null
            localStorage.clear()
        }
    }
})

export const {setAuth, setNotAuth} = userSlice.actions