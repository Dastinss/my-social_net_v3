import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'

const ProfileInfo = ( props ) => { // это презентационная компонента
    if (!props.profile) { // !props.profile=если профайла нет
        return <Preloader/> //запускаем крутилку
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src='https://c.wallhere.com/photos/b5/54/7500x2400_px_lake_landscape_mountain-707992.jpg!d'></img>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={'Hello my friends!!'}/>
            </div>
        </div>
    )
}

export default ProfileInfo;