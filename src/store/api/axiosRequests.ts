import {IFile} from "../filesSlice";
import axios from "axios";
import {IUserInitialState, setAuth} from "../userSlice";
import {addUploadFile, changeUploadFile, showUploader} from "../uploadSlice";
import {API_URL} from "../../config";


export async function uploadFile(file: any, dirId: string | null, dispatch: any) {
    return new Promise((resolve, reject) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now() + file.name}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const user = JSON.parse(localStorage.getItem("user") || "{}") as IUserInitialState
            const response = axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${user.user?.token}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.total
                    if (totalLength) {
                        const progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log("Progress: ", progress)
                        dispatch(changeUploadFile({id: uploadFile.id, progress: progress}))
                    }
                }
            });
            resolve(response)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

export async function uploadAvatar(file: any, dispatch: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const token = JSON.parse(localStorage.getItem("user") || "{}") as IUserInitialState
            const response = await axios.post(`${API_URL}api/files/avatar`, formData, {headers: {Authorization: `Bearer ${token.user?.token}`}})
            const user = response.data
            dispatch(setAuth({isAuth: true, user: user}))
            resolve(response)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

export async function deleteAvatar(dispatch: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const token = JSON.parse(localStorage.getItem("user") || "{}") as IUserInitialState
            const response = await axios.delete(`${API_URL}api/files/avatar`, {headers: {Authorization: `Bearer ${token.user?.token}`}})
            dispatch(setAuth({isAuth: true, user: response.data}))
            resolve(response)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

export async function downloadFile(file: IFile) {
    const user = JSON.parse(localStorage.getItem("user") || "{}") as IUserInitialState
    const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${user.user?.token}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export async function deleteFiles(fileId: string) {
    return new Promise((resolve, reject) => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}") as IUserInitialState
            const response = axios.delete(`${API_URL}api/files/delete?id=${fileId}`, {
                headers: {Authorization: `Bearer ${user.user?.token}`},
            });
            console.log(response)
            resolve(response)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}