import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setPopupDisplay} from "../../store/frontSlice";
import {useCreateDirMutation} from "../../store/api/apiSlice";
import {addDir} from "../../store/filesSlice";

const PopUp = () => {
    const dispatch = useAppDispatch()
    const currentDir = useAppSelector(state => state.files.currentDir)
    const [dirName, setDirName] = useState('')
    const popupDisplay = useAppSelector(state => state.front.popupDisplay)
    const [createDir, {
        data: dirData,
        error: dirError,
        isSuccess: dirIsSuccess,
        isError: dirIsError
    }] = useCreateDirMutation()

    async function createFolder() {
        await createDir({name: dirName, parent: currentDir})
    }

    useEffect(() => {
        if (dirIsSuccess) {
            dispatch(addDir(dirData))
            setDirName('')
            dispatch(setPopupDisplay(false))
        }
    }, [dirIsSuccess])

    return (
        <div className={popupDisplay ? 'popup active' : 'popup'} style={{display: popupDisplay ? 'flex' : 'none'}}
             onClick={() => dispatch(setPopupDisplay(false))}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <div className="popup-title">Create a new folder</div>
                    <div className="popup-close button" onClick={() => dispatch(setPopupDisplay(false))}>X</div>
                </div>
                <div className="popup-input validate-input">
                    <input type='text' placeholder='Enter a folder name.' value={dirName}
                           onChange={(e) => setDirName(e.target.value)}/>
                </div>
                <button className="popup-create button" onClick={() => createFolder()}>Create</button>
            </div>
        </div>
    );
};

export default PopUp;