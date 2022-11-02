import React from 'react';
import {useAppDispatch} from "../hooks/redux";
import {deleteAvatar, uploadAvatar} from "../store/api/axiosRequests";

const Profile = () => {
    const dispatch = useAppDispatch()

    async function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0]
        await uploadAvatar(file, dispatch)
    }

    return (
        <div>
            <button onClick={() => deleteAvatar(dispatch)}>Delete</button>
            <input accept='image/*' type="file" placeholder='Upload avatar' onChange={(e) => changeHandler(e)}/>
        </div>
    );
};

export default Profile;