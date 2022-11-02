import React, {useEffect} from 'react';
import {useAppSelector} from "../../hooks/redux";
import File from "./File";
import {type} from "os";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const FileList = () => {
    // console.log("render file list")
    const files = useAppSelector(state => state.files.files)
    const fileView = useAppSelector(state => state.front.view)

    if (files.length === 0) {
        return (
            <div className="file-list">
                <div className="files-not-found">
                    <p>Files not found!</p>
                </div>
            </div>
        )
    }

    if (fileView === 'plate') {
        return (
            <>
                <div className='file-plates'>
                    {files.map((file) =>
                        <File key={file._id} file={file}/>
                    )}
                </div>
            </>

        )
    }


    return (
        <div className='file-list'>
            <div className="file-list-title">
                <div className="file-list-name">Name</div>
                <div className="file-list-data">Data</div>
                <div className="file-list-size">Size</div>
            </div>
            <TransitionGroup>
                {files.map((file) =>
                    <CSSTransition key={file?._id} timeout={500} classNames={'file'} exit={false}>
                        <File file={file}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default FileList;