import React, {FC} from 'react';
import {useAppDispatch} from "../../../hooks/redux";
import {removeUploadFile} from "../../../store/uploadSlice";
import {IFile} from "../../../store/filesSlice";

const UploadFile = (file: { file: any }) => {

    const dispatch = useAppDispatch()
    return (
        <div className="upload-file">
            <div className="upload-file-header">
                <div className="upload-file-name">{file.file.name}</div>
                <button className="upload-file-remove" onClick={() => dispatch(removeUploadFile(file.file.id))}>X</button>
            </div>
            <div className="upload-file-progress">
                <div className="upload-bar" style={{width: file.file.progress * 3}}></div>
                <div className="upload-percent">{file.file.progress}</div>
            </div>
        </div>
    );
};

export default UploadFile;