import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

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
                {/*<ProfileStatus status={props.status} updateStatus={props.updateStatus}/> // 84 удалил класовую компоненту и добавил функцилнальнеую*/}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/> {/* // 84 заменил класовую компоненту на функцилнальнеую*/}
            </div>
        </div>
    )
}

export default ProfileInfo;