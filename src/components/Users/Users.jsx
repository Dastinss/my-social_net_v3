import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";

let Users = ( props ) => {

    let pagesCount = Math.ceil( props.totalUsersCount / props.pageSize ); // на сколько страниц делим выдаваемое с сервера кол-во пользователей

    let pages = []; //кол-во страниц с нашими юзерами с сервера

    for (let i = 1; i <= pagesCount; i++) {
        pages.push( i )
    }

    return <div>
        <div>
            {pages.map( p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                             onClick={( e ) => {
                                 props.onPageChanger( p )
                             }}>{p}</span>
            } )}
            {/*<span>1</span>*/}
            {/*<span className={styles.selectedPage}>2</span>*/}
            {/*<span>3</span>*/}
            {/*<span>4</span>*/}
            {/*<span>5</span>*/}
        </div>
        {
            props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.usersPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow( u.id )
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow( u.id )
                            }}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div> )
        }
    </div>
}

export default Users;