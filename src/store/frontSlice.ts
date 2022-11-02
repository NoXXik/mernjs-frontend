import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IFrontSlice {
    popupDisplay: boolean;
    dirStack: string[];
    sort: 'type' | 'name' | 'date';
    view: 'plate' | 'list';
    loader: boolean;
    searchName: string;
}

const initialState: IFrontSlice = {
    popupDisplay: false,
    dirStack: [''],
    sort: 'type',
    view: 'list',
    loader: false,
    searchName: ''
}

export const frontSlice = createSlice({
    name: "front",
    initialState: initialState,
    reducers: {
        setPopupDisplay(state, action: PayloadAction<boolean>) {
            state.popupDisplay = action.payload
        },
        pushToStack(state, action: PayloadAction<string>) {
            state.dirStack= state.dirStack.concat(action.payload)
        },
        popFromStack(state) {
            state.dirStack.pop()
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        showLoader(state) {
            state.loader = true
        },
        hideLoader(state) {
            state.loader = false
        },
        setSearch(state, action) {
            state.searchName = action.payload
        },
        setView(state, action) {
            state.view = action.payload
        }
    }
})

export const {setPopupDisplay, pushToStack, popFromStack, setSort, showLoader, hideLoader, setSearch, setView} = frontSlice.actions