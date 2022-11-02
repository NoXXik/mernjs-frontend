import React, {useEffect} from 'react';
import {deleteFile, IFile, setCurrentDir, setFiles} from "../../store/filesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useLazyGetFilesQuery} from "../../store/api/apiSlice";
import {pushToStack} from "../../store/frontSlice";
import {downloadFile, deleteFiles} from "../../store/api/axiosRequests";
import sizeFormat from '../../utils/sizeFormat'
import {useDebounce} from "../../hooks/UseDebounce";

const File = ({file}: { file: IFile }) => {
    const dispatch = useAppDispatch()
    const fileImages = [{type: 'dir', src: 'folder.png'}, {type: 'mp3', src: 'mp3_filetype.png'}, {
        type: 'png',
        src: 'png_filetype.png'
    }]
    const {sort, loader, searchName} = useAppSelector(state => state.front)
    const [getFiles, {data, error, isSuccess, isError, isLoading, isFetching}] = useLazyGetFilesQuery()
    const fileView = useAppSelector(state => state.front.view)
    const debounced = useDebounce(searchName, 800)


    async function openDirHandler(file: IFile) {
        if (file.type === 'dir') {
            dispatch(pushToStack(file._id))
            await getFiles({dirId: file._id, sort: sort, search: debounced})
        }
    }

    async function downloadClickHandler(e: any) {
        e.stopPropagation()
        await downloadFile(file)
    }


    async function deleteClickHandler(e: any) {
        e.stopPropagation()
        await deleteFiles(file._id).then(res => console.log(res))
        dispatch(deleteFile(file._id))
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCurrentDir(file._id))
            dispatch(setFiles(data))
        }
    }, [isSuccess])

    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openDirHandler(file)}>
                <img src={`./assets/images/${fileImages.find((image) => image.type === file.type)?.src}`} alt='icon'
                     className="file-plate-img"/>
                <div className="file-plate-name">{file.name}</div>
                {file.type !== 'dir' && <button className="download-btn" onClick={(e) => downloadClickHandler(e)}><img
                    src={`./assets/images/btn-download.svg`} width='40px' height='32px' alt="download-icon"
                    className="download-icon"/></button>}
                <button className="delete-btn" onClick={(e) => deleteClickHandler(e)}><img src={`./assets/images/btn-delete.svg`} width='32px' height='32px'
                                                                                           alt="delete-icon" className="delete-icon"/></button>
            </div>
        );
    }

    return (
        <div className='file' onClick={() => openDirHandler(file)}>
            <img src={`./assets/images/${fileImages.find((image) => image.type === file.type)?.src}`} alt='icon'
                 className="file-img"/>
            <div className="file-name">{file.name}</div>
            <div className="file-date">{file.date.slice(0, 10)}</div>
            <div className="file-size">{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && <button className="download-btn" onClick={(e) => downloadClickHandler(e)}><img
                src={`./assets/images/btn-download.svg`} width='40px' height='32px' alt="download-icon"
                className="download-icon"/></button>}
            <button className="delete-btn" onClick={(e) => deleteClickHandler(e)}><img src={`./assets/images/btn-delete.svg`} width='32px' height='32px'
                                                alt="delete-icon" className="delete-icon"/></button>
        </div>
    );
};

export default File;