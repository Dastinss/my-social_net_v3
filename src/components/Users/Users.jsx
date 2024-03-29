import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = ( { totalUsersCount, pageSize, currentPage, onPageChanger, users, ...props } ) => { // #90 делаем деструктуризацию параметров - вместо "общerо" meta указали внутреннюю деструктуризацию
    // #90 перенесли в отдельную компоненту Paginator. См.ниже
    // let pagesCount = Math.ceil( props.totalItemsCount / props.pageSize ); // на сколько страниц делим выдаваемое с сервера кол-во пользователей
    // let pages = []; //кол-во страниц с нашими юзерами с сервера
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push( i )
    // }

    return <div>
        <Paginator currentPage={currentPage} onPageChanger={onPageChanger} totalItemsCount={totalUsersCount}
                   pageSize={pageSize}/>
        {/*/!*<div>*!/ // #90 перенесли в отдельную компоненту Paginator. См.выше*/}
        {/*    {pages.map( p => {*/}
        {/*        // return <span className={props.currentPage === p && styles.selectedPage} // закоментил т.к. выдавала ошибку система с рекомендацией сделать так, как строкой ниже*/}
        {/*        return <span className={props.currentPage === p ? styles.selectedPage : undefined}*/}
        {/*                     onClick={( e ) => {*/}
        {/*                         props.onPageChanger( p )*/}
        {/*                     }}>{p}</span>*/}
        {/*    } )}*/}
        {/*    /!*className={condition && value} {condition ? value : undefined}*!/*/}
        {/*    /!*<span>1</span>*!/*/}
        {/*    /!*<span className={styles.selectedPage}>2</span>*!/*/}
        {/*    /!*<span>3</span>*!/*/}
        {/*    /!*<span>4</span>*!/*/}
        {/*    /!*<span>5</span>*!/*/}
        {/*</div>*/}
        <div>
            {
                users.map( u => <User user={u}
                                      followingInProgress={props.followingInProgress}
                                      key={u.id}
                                      follow={props.follow}
                                      unfollow={props.unfollow}/>

                    //#90 перенесли в отдельную компоненту <User/> все что ниже//
                    // <div >
                    //             <span>
                    //                 <div>
                    //                     <NavLink
                    //                         to={'/profile/' + u.id}> {/* это как тег <a> c доп инкапсулированной логикой, делаем так ,чтобы при клике на иконку добавлялся выбранный контакт в  */}
                    //                         <img src={u.photos.small !== null ? u.photos.small : userPhoto}
                    //                              className={styles.usersPhoto}/>
                    //                     </NavLink>
                    //                     </div>
                    //                 <div>
                    //                     {u.followed
                    //                         ? <button disabled={followingInProgress
                    //                             .some( id => id === u.id )}
                    //                                   onClick={() => {
                    //                                       unfollow( u.id )
                    //                                   }}> {/*// если хоть одна ид равна ид пользователя, то ид дизэйблится*/}
                    //
                    //
                    //                             {/*//закоментил, т.к перенес в usersReducer*/}
                    //                             {/*// props.toggleFollowingProgress( true, u.id ); // диспатчим*/}
                    //                             {/*// userAPI.unfollow( u.id ) // добавил в уроке 66 после того, как перенес обращение на сервер в api*/}
                    //                             {/*//*/}
                    //                             {/*//     //закоментил, т.к перенес в api*/}
                    //                             {/*//     // axios.delete( `https://social-network.samuraijs.com/api/1.0/unfollow/${u.id}`, { //НЕ принимает второй параметр - раскажут позднее. Вторым параметром идет параметр настройки*/}
                    //                             {/*//     //     withCredentials: true,*/}
                    //                             {/*//     //     headers: {*/}
                    //                             {/*//     //         'API-KEY': 'a7ac1bc5-0d23-4742-ab18-200ee19c5490'*/}
                    //                             {/*//     //     } // добавляем обязательный ключ доступа с моего аккаунта на сайте камасутра, иначе не могу фоловить/анфоловить*/}
                    //                             {/*//     // } ) //вторым параметром почетому передаем пустой обьект - раскажут позднее*/}
                    //                             {/*//     .then( response => {*/}
                    //                             {/*//         if (response.data.resultCode == 0) {*/}
                    //                             {/*//             props.unfollow( u.id );*/}
                    //                             {/*//         }*/}
                    //                             {/*//         props.toggleFollowingProgress( false, u.id );*/}
                    //                             {/*//     } );*/}
                    //
                    //                             Unfollow</button>
                    //                         : <button disabled={followingInProgress.some( id => id === u.id )}
                    //                                   onClick={() => {
                    //                                       follow( u.id )
                    //                                   }}>
                    //                             {/*// props.toggleFollowingProgress( true, u.id );*/}
                    //                             {/*// userAPI.follow( u.id ) // добавил в уроке 66 после того, как перенес обращение на*/}
                    //                             {/*сервер в api*/}
                    //
                    //                             {/*//закоментил, т.к перенес в api*/}
                    //                             {/*// axios.post( `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {*/}
                    //                             {/*//     withCredentials: true,*/}
                    //                             {/*//     headers: {*/}
                    //                             {/*//         'API-KEY': 'a7ac1bc5-0d23-4742-ab18-200ee19c5490'*/}
                    //                             {/*//     } // добавляем обязательный ключ доступа с моего аккаунта на сайте камасутра, иначе не могу фоловить/анфоловить*/}
                    //                             {/*// } ) //вторым параметром почетому передаем пустой обьект - раскажут позднее*/}
                    //                             {/*// .then( response => {*/}
                    //                             {/*//     if (response.data.resultCode == 0) {*/}
                    //                             {/*//         props.follow( u.id );*/}
                    //                             {/*//     }*/}
                    //                             {/*//     props.toggleFollowingProgress( false, u.id );*/}
                    //                             {/*// } );*/}
                    //                             Follow </button>}
                    //                     </div>
                    //             </span>
                    //             <span>
                    //                 <span>
                    //                     <div>{u.name}</div>
                    //                     <div>{u.status}</div>
                    //                 </span>
                    //             <span>
                    //                     <div>{'u.location.country'}</div>
                    //                     <div>{'u.location.city'}</div>
                    //                 </span>
                    //         </span>
                    // </div>
                )
            }
        </div>
    </div>
}

export default Users;