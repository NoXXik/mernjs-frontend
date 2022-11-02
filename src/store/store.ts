import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./userSlice";
import {filesSlice} from "./filesSlice";
import {apiSlice} from "./api/apiSlice";
import {frontSlice} from "./frontSlice";
import {uploadSlice} from "./uploadSlice";


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        files: filesSlice.reducer,
        front: frontSlice.reducer,
        uploader: uploadSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
