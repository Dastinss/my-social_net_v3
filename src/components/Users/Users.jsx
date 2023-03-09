import React from "react";
import styles from "./users.module.css"

let Users = ( props ) => {

    // през.компонента перед отрисовкой взяла и засетала наших юзеров если их еще нет
    if (props.users.length === 0) {
        props.setUsers( [
                {
                    id: 1,
                    photoUrl: 'https://klike.net/uploads/posts/2022-07/1657520679_12.jpg',
                    followed: false,
                    fullName: 'Sergiy',
                    status: 'I am a boss',
                    location: { city: 'Kharkiv', country: 'Ukraine' }
                },
                {
                    id: 2,
                    photoUrl: 'https://klike.net/uploads/posts/2022-07/1657520712_31.jpg',
                    followed: true,
                    fullName: 'Mike',
                    status: 'I am a boss too',
                    location: { city: 'Munchen', country: 'Germany' }
                },
                {
                    id: 3,
                    photoUrl: 'https://klike.net/uploads/posts/2022-07/1657520690_19.jpg',
                    followed: false,
                    fullName: 'Kolya',
                    status: 'I am a captain',
                    location: { city: 'Moscow', country: 'Russia' }
                },
            ]
        )
    }

    return <div>
        {
            props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img className={styles.usersPhoto} src={u.photoUrl}/>
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
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>

            </div> )
        }
    </div>
}

export default Users;