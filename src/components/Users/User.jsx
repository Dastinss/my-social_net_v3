import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";

let User = ( { user, followingInProgress, unfollow, follow } ) => { // #90 делаем деструктуризацию параметров - вместо "общerо" meta указали внутреннюю деструктуризацию
    return (
        <div>
                <span>
                    <div>
                        <NavLink
                            to={'/profile/' + user.id}> {/* это как тег <a> c доп инкапсулированной логикой, делаем так ,чтобы при клике на иконку добавлялся выбранный контакт в  */}
                            <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                                 className={styles.usersPhoto}/>
                        </NavLink>
                        </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress
                                .some( id => id === user.id )}
                                      onClick={() => {
                                          unfollow( user.id )
                                      }}> {/*// если хоть одна ид равна ид пользователя, то ид дизэйблится*/}

                                Unfollow</button>
                            : <button disabled={followingInProgress.some( id => id === user.id )}
                                      onClick={() => {
                                          follow( user.id )
                                      }}>
                                Follow </button>}
                        </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>
            </span>
        </div>
    )
}

export default User;