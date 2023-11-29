import React, { useState } from 'react';
import styles from "./Paginator.module.css";

let Paginator = ( { totalItemsCount, pageSize, currentPage, onPageChanger, portionSize = 10 } ) => { //#90 будет возвращать нам JSX страничек + 93 добавил portionSize = 10
	let pagesCount = Math.ceil( totalItemsCount / pageSize ); // на сколько страниц делим выдаваемое с сервера кол-во пользователей
	let pages = []; //кол-во страниц с нашими юзерами с сервера
	for (let i = 1; i <= pagesCount; i++) {
		pages.push( i )
	}

	//#93 добавил дробление юзеров на группы по 10 человек
	let portionCount = Math.ceil( pagesCount / portionSize );
	let [portionNumber, setPortionNumber] = useState( 1 ); // чтобы не засорять глобальный стейт, делаем локальный стейт для отображения порций страничек
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;

	return <div className={styles.paginator}>
		{portionNumber > 1 && // показывай кнопку влево, если portionNumber > 1
			<button onClick={() => { setPortionNumber( portionNumber - 1 )}}>PREV</button>}

		{pages
			.filter( p => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
			.map( ( p ) => {
				return <span className={({
					[ styles.selectedPage ]: currentPage === p
				}, styles.pageNumber)}
				             key={p}
				             onClick={( e ) => {
					             onPageChanger(p);
				             }}>{p}</span>
			} )}
		{portionCount > portionNumber && // показывай кнопку вправо, если portionCount > portionNumbe
			<button onClick={ () => {setPortionNumber(portionNumber + 1)} }>NEXT</button>}

		{/*// 93 закоментил, потому что сделал другую логику выше*/}
		{/*{pages.map( p => {    */}
		{/*	// return <span className={props.currentPage === p && styles.selectedPage} // закоментил т.к. выдавала ошибку система с рекомендацией сделать так, как строкой ниже*/}
		{/*	return <span*/}
		{/*		className={currentPage === p ? styles.selectedPage : undefined} // по спану кликаем и вызываем страничку*/}
		{/*		onClick={( e ) => {*/}
		{/*			onPageChanger( p )*/}
		{/*		}}>{p}</span>*/}
		{/*} )}*/}

	</div>
}

export default Paginator;