//Это классовая компонента!!! Работет через колл беки, берет все время у пропсов что то
// (которые приходят из mapDispatchToProps в UsersContainer.jsx). Сделали класс компоненту из функциональной , которую удалили в уроке 53

import React from "react";
import styles from "./users.module.css"
import axios from "axios";
import userPhoto from '../../assets/images/user.png';

class Users extends React.Component { // без extends React.Component с этой компонентой React не сможет взаимодействовать
    // constructor( props ) { // закоментили в уроке 53 когда перенесли запрос ajax в  componentDidMount
    //     super( props );
    //     axios.get( 'https://social-network.samuraijs.com/api/1.0/users' ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
    //         this.props.setUsers( response.data.items );
    //     } );
    // };

    componentDidMount() { // метод жизненного цикла компоненты. Компонента монтирует страничку только один раз
        axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}` ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
            this.props.setUsers( response.data.items );
            this.props.setTotalUsersCount ( response.data.totalCount ); //мы хотим что то с компоненты UI отправить в state, нам нужен для єтого колл бек, который передают через пропсы. Значит такой колл бек который что то меняет в state приходит из mapDispatchToProps
        } );
    }

    onPageChanger = ( pageNumber ) => { //вынесли сюда ф-цию по кликанию на страницах (12345), точнее создали метод, т.к. это классовая компонента
        this.props.setCurrentPage( pageNumber );
        axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}` ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
            this.props.setUsers( response.data.items );
        } );
    }

    render() { // обязательный метод, т.к. именно метод render возвращает JSX. props сюда не приходят. ЭТО делает Реакт в ПЕРВУЮ очередь - сначала рисуется НИЧЕГО :)

        let pagesCount = Math.ceil( this.props.totalUsersCount / this.props.pageSize ); // на сколько страниц делим выдаваемое с сервера кол-во пользователей

        let pages = []; //кол-во страниц с нашими юзерами с сервера

        for (let i = 1; i <= pagesCount; i++) {
            pages.push( i )
        }

        return <div>
            <div>
                {pages.map( p => {
                    return <span className={this.props.currentPage === p && styles.selectedPage}
                                 onClick={ (e) => { this.onPageChanger (p) } }>{p}</span>
                } )}
                {/*<span>1</span>*/}
                {/*<span className={styles.selectedPage}>2</span>*/}
                {/*<span>3</span>*/}
                {/*<span>4</span>*/}
                {/*<span>5</span>*/}
            </div>
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