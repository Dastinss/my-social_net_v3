import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ( {profile, status, updateStatus} ) => { // #90 делаем деструктуризацию параметров - вместо "общerо" meta указали внутреннюю деструктуризацию // это презентационная компонента
    if (!profile) { // !props.profile=если профайла нет
        return <Preloader/> //запускаем крутилку
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src='https://c.wallhere.com/photos/b5/54/7500x2400_px_lake_landscape_mountain-707992.jpg!d'></img>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large}/>
                {/*<ProfileStatus status={props.status} updateStatus={props.updateStatus}/> // 84 удалил класовую компоненту и добавил функцилнальнеую*/}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/> {/* // 84 заменил класовую компоненту на функцилнальнеую*/}
            </div>
        </div>
    )
}

export default ProfileInfo;