import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src='https://c.wallhere.com/photos/b5/54/7500x2400_px_lake_landscape_mountain-707992.jpg!d'></img>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;