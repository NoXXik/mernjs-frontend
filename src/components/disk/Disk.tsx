import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useLazyGetFilesQuery} from "../../store/api/apiSlice";
import FileList from "./FileList";
import {addFile, setCurrentDir, setFiles} from "../../store/filesSlice";
import PopUp from "./PopUp";
import {
    hideLoader,
    popFromStack,
    pushToStack,
    setPopupDisplay,
    setSort,
    setView,
    showLoader
} from "../../store/frontSlice";
import {uploadFile} from "../../store/api/axiosRequests";
import Uploader from "./Uploader/Uploader";
import {showUploader} from "../../store/uploadSlice";
import {useDebounce} from "../../hooks/UseDebounce";

const Disk = () => {
    const dispatch = useAppDispatch()
    const {currentDir, files} = useAppSelector(state => state.files)
    const [getFiles, {data, error, isSuccess, isError, isLoading, isFetching}] = useLazyGetFilesQuery()
    const {dirStack, sort, loader, searchName} = useAppSelector(state => state.front)
    const [dragStatus, setDragStatus] = useState(false)
    const {isVisible, uploadFiles} = useAppSelector(state => state.uploader)
    const debounced = useDebounce(searchName, 800)


    const showPopupDisplay = () => {
        dispatch(setPopupDisplay(true))
    }

    async function backClickHandler() {
        dispatch(popFromStack())
        dispatch(setCurrentDir(dirStack[dirStack.length - 2]))
    }

    const fileUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const files = [...e.target.files]
        let promises: any[] = []
        console.log('fileUploadHandler')
        dispatch(showUploader())
        files.forEach(file => {
            promises.push(uploadFile(file, currentDir, dispatch))
            console.log(file.name, files.length)

        })
        Promise.all(promises).then(res => res.forEach(file => {
            dispatch(addFile(file.data.dbFile))
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("files fetch")
            await getFiles({dirId: currentDir, sort: sort, search: searchName})
        }
        fetchData()
    }, [currentDir, sort, debounced])


    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setFiles(data))
        }
    }, [data])

    function dragEnterHandler(e: React.DragEvent) {
        e.stopPropagation()
        e.preventDefault()
        setDragStatus(true)
    }

    function dragLeaveHandler(e: React.DragEvent) {
        e.stopPropagation()
        e.preventDefault()
        setDragStatus(false)
    }

    function dragOverHandler(e: React.DragEvent) {
        e.stopPropagation()
        e.preventDefault()
    }

    async function dropHandler(e: React.DragEvent) {
        e.stopPropagation()
        e.preventDefault()
        let promises: any[] = []
        // @ts-ignore
        let files = [...e.dataTransfer.files]
        files.forEach(file => {
            promises.push(uploadFile(file, currentDir, dispatch))
        })
        Promise.all(promises).then(res => res.forEach(file => dispatch(addFile(file.data.dbFile))))
        setDragStatus(false)
    }

    if (isFetching || isLoading) {
        dispatch(showLoader())
    } else {
        dispatch(hideLoader())
    }

    if (loader) {
        return (
            <>
                <div className="loader">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
        )
    }

    return (!dragStatus ?
            <>
                <div className="disk-container">
                    <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                         onDragOver={dragEnterHandler}>
                        <div className="disk-buttons">
                            <button className="disk-back button" onClick={() => backClickHandler()}>Back</button>
                            <button className="disk-create button" onClick={() => showPopupDisplay()}>Create folder
                            </button>
                            <div className="disk-upload">
                                <label className="disk-upload-label" htmlFor="disk-upload-input">Upload</label>
                                <input type="file" multiple={true} onChange={(e) => fileUploadHandler(e)}
                                       className="disk-upload-input" id='disk-upload-input'/>
                            </div>
                            <select className='disk-select-sort' value={sort}
                                    onChange={e => dispatch(setSort(e.target.value))}>
                                <option value={'name'}>Name</option>
                                <option value={'type'}>Type</option>
                                <option value={'date'}>Date</option>
                            </select>
                            <button className="disk-plate" onClick={() => dispatch(setView('plate'))}></button>
                            <button className="disk-list" onClick={() => dispatch(setView('list'))}></button>
                        </div>
                        <FileList/>
                        <PopUp/>
                    </div>
                    {isVisible && <Uploader/>}
                </div>

            </>
            :
            <>
                <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                     onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                    Перетащите файлы сюда
                </div>
            </>
    );
};

export default Disk;