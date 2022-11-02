import React from 'react';
import UploadFile from "./UploadFile";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {hideUploader} from "../../../store/uploadSlice";

const Uploader = () => {
    const files = useAppSelector(state => state.uploader.uploadFiles)
    console.log('sddsd',files)
    const dispatch = useAppDispatch()
    return (
        <div className="uploader">
            <div className="uploader-header">
                <div className="uploader-title">Upload</div>
                <button className="uploader-close" onClick={() => dispatch(hideUploader())}>X</button>
            </div>
            {files.map(file => <UploadFile key={file.id} file={file}/>)}
        </div>
    );
};

export default Uploader;