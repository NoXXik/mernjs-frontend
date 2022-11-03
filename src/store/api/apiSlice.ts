import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser, IUserInitialState} from "../userSlice";
import {IFile} from "../filesSlice";


interface IUserRegistration {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface IUserLogin {
    email: string;
    password: string;
}


export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Files'],
    baseQuery: fetchBaseQuery({
        baseUrl: `https://mernjs-backend.herokuapp.com/api`,
        prepareHeaders: (headers: Headers) => {
            const user = JSON.parse(localStorage.getItem("user") || "{}") as IUserInitialState
            if (user.user?.token) {
                headers.set("Authorization", `Bearer ${user.user?.token}`)
            }
            return headers
        }
    }),
    endpoints: (build) => ({
        userRegistration: build.mutation<any, IUserRegistration>({
            query: (body) => ({
                url: '/auth/registration',
                method: "POST",
                body: body
            })
        }),
        userLogin: build.mutation<IUser, IUserLogin>({
            query: (body) => ({
                url: '/auth/login',
                method: "POST",
                body: body
            })
        }),
        userAuth: build.query<IUser, string>({
            query: () => ('/auth/auth')
        }),
        getFiles: build.query<IFile[], {dirId: string | null, sort: string, search: string}>({
            query: ({dirId, sort, search}) => ({
                url: `/files${'?sort='+sort}${dirId ? `&parent=`+dirId: ''}${'&search='+search}`,
            }),
            providesTags: ['Files']
        }),
        createDir: build.mutation<IFile, any>({
            query: ({name, parent}) => ({
                url: `/files`,
                method: "POST",
                body: {
                    name: name,
                    type: 'dir',
                    parent: parent
                }
            }),
            invalidatesTags: ['Files']
        }),
        uploadFile: build.mutation<{}, FormData>({
            query: (formData) => ({
                url: '/files/upload',
                method: "POST",
                body: formData
            })
        })
    })
})


export const {useUserLoginMutation, useUserRegistrationMutation, useUserAuthQuery, useLazyGetFilesQuery, useCreateDirMutation} = apiSlice