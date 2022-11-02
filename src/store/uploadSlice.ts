import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUpload {
    isVisible: boolean;
    uploadFiles: IUploadFile[]
}
interface IUploadFile {
    name: string;
    progress: number;
    id: string;
}

const initialState: IUpload = {
    isVisible: false,
    uploadFiles: []
}

export const uploadSlice = createSlice({
    name: "uploader",
    initialState: initialState,
    reducers: {
        showUploader(state) {
            state.isVisible = true
        },
        hideUploader(state) {
            state.isVisible = false
        },
        addUploadFile(state, action) {
            // @ts-ignore
            state.uploadFiles = state.uploadFiles.concat(action.payload)
        },
        removeUploadFile(state, action) {
            state.uploadFiles = state.uploadFiles.filter(file => file.id != action.payload)
        },
        changeUploadFile(state, action: PayloadAction<{id: string, progress: number}>) {
            state.uploadFiles = state.uploadFiles.map(file => ({...file, progress: file.id == action.payload.id ? action.payload.progress : file.progress})
            )
        }
    }
})

export const {showUploader, hideUploader, addUploadFile, removeUploadFile, changeUploadFile} = uploadSlice.actions