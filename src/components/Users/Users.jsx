import React from "react";
import styles from "./users.module.css"
import axios from "axios";
import userPhoto from '../../assets/images/user.png';

let Users = ( props ) => {
let getUsers = () => {
    // през.компонента перед отрисовкой взяла и засетала наших юзеров если их еще нет
        if (props.users.length === 0) {

            axios.get( 'https://social-network.samuraijs.com/api/1.0/users' ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
                props.setUsers( response.data.items );
            } );

            // props.setUsers( [ // закоментили в уроке 51 т.к. ждем данные с сервера
            //         {
            //             id: 1,
            //             photoUrl: 'https://klike.net/uploads/posts/2022-07/1657520679_12.jpg',
            //             followed: false,
            //             fullName: 'Sergiy',
            //             status: 'I am a boss',
            //             location: { city: 'Kharkiv', country: 'Ukraine' }
            //         },
            //         {
            //             id: 2,
            //             photoUrl: 'https://klike.net/uploads/posts/2022-07/1657520712_31.jpg',
            //             followed: true,
            //             fullName: 'Mike',
            //             status: 'I am a boss too',
            //             location: { city: 'Munchen', country: 'Germany' }
            //         },
            //         {
            //             id: 3,
            //             photoUrl: 'https://klike.net/uploads/posts/2022-07/1657520690_19.jpg',
            //             followed: false,
            //             fullName: 'Kolya',
            //             status: 'I am a captain',
            //             location: { city: 'Moscow', country: 'Russia' }
            //         },
            //     ]
            // )
        }
    }

    return <div>
        <button onClick={getUsers} > Get Users </button>
        {
            props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto } className={styles.usersPhoto} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow( u.id )
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.folllow( u.id )
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

//  <div>{'u.location.country'}</div> взяли в кавЫчки в 51 уроке ,т.к. с сервера приходят данные без этого параметра но он у нач предуспотрен дизайном...к примеру ))