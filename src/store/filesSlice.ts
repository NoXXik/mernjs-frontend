import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface IFile {
	_id: string;
	name: string;
	type: string;
	size: number;
	path: string;
    date: string;
	user: string;
	parent: string;
	child: any[];
	__v: number;
}

interface FileInitialState {
    files: IFile[],
    currentDir: string | null,
}

const initialState: FileInitialState = {
    files: [],
    currentDir: null
}

export const filesSlice = createSlice({
    name: "files",
    initialState: initialState,
    reducers: {
        setFiles(state, action) {
            state.files = action.payload
        },
        addFile(state, action) {
            state.files = state.files.concat(action.payload)
        },
        setCurrentDir(state, action) {
            state.currentDir = action.payload
        },
        addDir(state, action) {
            state.files = state.files.concat(action.payload)
        },
        deleteFile(state, action: PayloadAction<string>) {
            state.files = state.files.filter(file => file._id != action.payload)
        }
    }
})

export const {setFiles, setCurrentDir, addDir, addFile, deleteFile} = filesSlice.actions