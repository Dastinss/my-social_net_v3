import React from 'react';
import styles from "./Paginator.module.css";

let Paginator = ( {totalUsersCount, pageSize, currentPage, onPageChanger} ) => { //#90 будет возвращать нам JSX страничек
    let pagesCount = Math.ceil( totalUsersCount / pageSize ); // на сколько страниц делим выдаваемое с сервера кол-во пользователей
    let pages = []; //кол-во страниц с нашими юзерами с сервера
    for (let i = 1; i <= pagesCount; i++) {
        pages.push( i )
    }

    return <div>
        {pages.map( p => {
            // return <span className={props.currentPage === p && styles.selectedPage} // закоментил т.к. выдавала ошибку система с рекомендацией сделать так, как строкой ниже
            return <span className={currentPage === p ? styles.selectedPage : undefined}
                         onClick={( e ) => {
                             onPageChanger( p )
                         }}>{p}</span>
        } )}

    </div>
}

export default Paginator;