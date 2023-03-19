//Это классовая компонента!!! сделали ее из функциональной , которую удалили в уроке 53

import React from "react";
import styles from "./users.module.css"
import axios from "axios";
import userPhoto from '../../assets/images/user.png';

class Users extends React.Component { // без extends React.Component с этой компонентой React не сможет взаимодействовать
    constructor( props ) {
        super( props );
        axios.get( 'https://social-network.samuraijs.com/api/1.0/users' ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
            this.props.setUsers( response.data.items );
        } );
    }

    render() { // именно метод render возвращает JSX. props сюда не приходят
        return <div>
            {
                this.props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.usersPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollow( u.id )
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.folllow( u.id )
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

}

export default Users;