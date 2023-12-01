// Єто у нас BLL уровень !!! Єто бизнес логика - ОТ НЕЕ ОТТАЛКИВАЕМСЯ!!! UI (Users) - єто уже производная от BLL
//Все значения в state меняются через редьюсер

import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_CURRENT_USERS_COUNT = 'SET_CURRENT_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'; //меняем значения картинки-крутилки (лоадер)
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'; //меняем значения кнопки follow/unfollow
// const FAKE = 'FAKE';// 83 - тестировали reselector

let initialState = {
	users: [], // в state есть пустой массив в нем пользователи кот счас нет и которых мы запрашиваем с сервера и потом сюда сетаем
	pageSize: 10, // захардкодили количество страниц + в уроке 93 изменил с 5 а 10
	totalUsersCount: 0, // мы не знаем сколько юзеров, пока не уйдет запрос на сервер и пока мы не узнаем ответ
	currentPage: 1, // текущая страница (которая подсвечивается среди прочихЖ 12345)
	isFetching: true, // состояние загруженности страницы (крутилка)
	followingInProgress: [], // состояние кнопки follow/unfollow
	fake: 10// 83 - тестировали reselector
}

const usersReducer = ( state = initialState, action ) => {

	switch (action.type) {
		// case FAKE: return {...state, fake: state.fake + 1}// 83 - тестировали reselector
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray( state.users, action.userId, 'id', { followed: true } )
				// # 90 закоментировал поскольку ввели универсальную ф-цию (см выше)
				// // users: [...state.users] - создаем копию, но лучше делать через мар, т.к. нам нужно изменить только один обїект, а вытащить его проще через мар
				// users: state.users.map( u => {
				//     if (u.id === action.userId) {
				//         return { ...u, followed: true } // если ID совпадает, то возвращаем копию обекта, если не совпадает - то возвращаем сам обїект
				//     }
				//     return u;
				// } )
			}

		case UNFOLLOW :
			return {
				...state,
				users: updateObjectInArray( state.users, action.userId, 'id', { followed: false } )
				// # 90 закоментировал поскольку ввели универсальную ф-цию (см выше)
				// users: state.users.map( u => {
				//     if (u.id === action.userId) {
				//         return { ...u, followed: false }
				//     }
				//     return u;
				// } )
			}

		case SET_USERS : {
			// return { ...state, users: action.users } // если откуда то придут пользователи, то мы должны взять старый стейт, взять пользователей которые там были и перезатереть их теми пользователямя, которые пришли в action
			return { ...state, users: action.users }
		}

		case SET_CURRENT_PAGE: {
			return { ...state, currentPage: action.currentPage }// меняем currentPage на тот Page который сидит в action
		}

		case SET_CURRENT_USERS_COUNT: {
			return { ...state, totalUsersCount: action.count }// меняем currentPage на тот Page который сидит в action
		}

		case TOGGLE_IS_FETCHING: {
			return { ...state, isFetching: action.isFetching }
		}

		case TOGGLE_IS_FOLLOWING_PROGRESS: {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter( id => id != action.userId ) // в редьюсере обработка action из AC
			}
		}

		default:
			return state;
	}
};

export const followSuccess = ( userId ) => ({ type: FOLLOW, userId }); // AC = ActionCreator ф-ция которая формирует и возвращает action
export const unfollowSuccess = ( userId ) => ({ type: UNFOLLOW, userId });
export const setUsers = ( users ) => ({ type: SET_USERS, users });
export const setCurrentPage = ( currentPage ) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = ( totalUsersCount ) => ({ type: SET_CURRENT_USERS_COUNT, count: totalUsersCount });
export const toggleFetching = ( isFetching ) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = ( isFetching, userId ) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId
}); //диспатчим этот АС в Юзер Контейнерной компоненте

export const requestUsers = ( page, pageSize ) => { // #90 ввели await // создаем ф-цию thunk. thunk -ф-ция, это ф-ция, которую создали в редьюсере которая диспатчит обычные астионы , которые делают асинхронную работу.
	// ф-ция thunk , которая принимает метод dispatch и как все другие санки внутри себя диспатчит другие актионы. Перенесли в уроке 66 из UsersContainer в уровень BLL всю "магию" - комбинацию хитріх штук, а в UI просто дадим users-ов. В Thunk диспатчим обычные астионы, или др словами вызов АС, который возвращает нам астионы
	// return (dispatch) => { // #90 закоментили потому что ввели await
	return async ( dispatch ) => { // #90 ввели await
		dispatch( toggleFetching( true ) ); // перенесли "крутилку" в уроке 66 в уровень бизнеса из конейнерной компоненты.
		dispatch( setCurrentPage( page ) ); // сделали жирным подсветку страниц в уроке 81

		let data = await userAPI.getUsers( page, pageSize )
		// .then( data => { // #90 закоментили потому что ввели await // импортируем ф-цию с запросом с api
		dispatch( setCurrentPage( page ) ); // добавил по со    вету из комментариев к видео, хотя Димыч это не делал. Изначально в UsersContainer это было удалено onPageChanger - откуда переносили не было
		dispatch( toggleFetching( false ) ); // диспатчим что закончился тогллинг
		dispatch( setUsers( data.items ) ); // юзер не из вне вызывается как раньше UsersContainer, а сетаем юзера внутри БЛЛ- бизнес их запросил и бизнес их сетает
		dispatch( setTotalUsersCount( data.totalCount ) ); //мы хотим что то с компоненты UI отправить в state, нам нужен для єтого колл бек, который передают через пропсы. Значит такой колл бек который что то меняет в state приходит из mapDispatchToProps
		// } );
	}
}

//====СТАЛО=============================================================================================
const followUnfollow = async ( dispatch, userId, apiMethod, actionCreator ) => {
	dispatch( toggleFollowingProgress( true, userId ) ); // диспатчим обычный астион
	let response = await apiMethod( userId )

	if (response.data.resultCode == 0) {
		dispatch( actionCreator( userId ) );
	}
	dispatch( toggleFollowingProgress( false, userId ) );
}

export const follow = ( userId ) => { // создаем ф-цию thunk. thunk -ф-ция, это ф-ция, которую создали в редьюсере которая диспатчит обычные астионы , которые делают асинхронную работу.

	return async ( dispatch ) => {
		// let apiMethod = userAPI.follow.bind( userAPI ); // #90 ввели потому что убираем дублирование кода
		// let actionCreator = followSuccess; // #90 ввели потому что убираем дублирование кода
		// followUnfollow( dispatch, userId, apiMethod, actionCreator )
		followUnfollow( dispatch, userId, userAPI.follow.bind( userAPI ), followSuccess )

		// dispatch( toggleFollowingProgress( true, userId ) ); // диспатчим обычный астион
		// let response = await apiMethod( userId ) // #90 ввели чтобы убрать дублирование кода

		// let response = await userAPI.follow( userId ) // #90 закоментили потому что убираем дублирование кода // добавил в уроке 66 после того, как перенес обращение на сервер в api

		// // .then( response => { // #90 закоментили потому что ввели await
		// if (response.data.resultCode == 0) {
		//     // dispatch( followSuccess( userId ) ); // #90 закоментили потому что убираем дублирование кода
		// dispatch( actionCreator( userId ) ); // #90 ввели потому что убираем дублирование кода
		// }
		// dispatch( toggleFollowingProgress( false, userId ) );
		// // } );
		// }
	}
}

export const unfollow = ( userId ) => { // создаем ф-цию thunk. thunk -ф-ция, это ф-ция, которую создали в редьюсере которая диспатчит обычные астионы , которые делают асинхронную работу.

	return async ( dispatch ) => {
		// let apiMethod = userAPI.unfollow.bind( userAPI ); // #90 ввели потому что убираем дублирование кода
		// let actionCreator = unfollowSuccess; // #90 ввели потому что убираем дублирование кода
		followUnfollow( dispatch, userId, userAPI.unfollow.bind( userAPI ), unfollowSuccess )

		// dispatch( toggleFollowingProgress( true, userId ) ); // диспатчим обычный астион
		// // let response = await apiMethod( userId ) // #90 ввели чтобы убрать дублирование кода
		// let response = apiMethod( userId ) // #90 закоментили потому что убираем дублирование кода // добавил в уроке 66 после того, как перенес обращение на сервер в api
		// let response = await userAPI.unfollow( userId ) // #90 закоментили потому что убираем дублирование кода // добавил в уроке 66 после того, как перенес обращение на сервер в api

		// if (response.data.resultCode == 0) {
		//         dispatch( actionCreator( userId ) );// #90 ввели потому что убираем дублирование кода
		//     }
		//     dispatch( toggleFollowingProgress( false, userId ) );
		// }
		// // .then( response => { // #90 закоментили потому что ввели await

		//     // dispatch( unfollowSuccess( userId ) );// #90 закоментили потому что убираем дублирование кода

		// } );
	}
}

export default usersReducer;

//====БЫЛО=============================================================================================
// export const follow = ( userId ) => { // создаем ф-цию thunk. thunk -ф-ция, это ф-ция, которую создали в редьюсере которая диспатчит обычные астионы , которые делают асинхронную работу.
//
//     return async ( dispatch ) => {
//         dispatch( toggleFollowingProgress( true, userId ) ); // диспатчим обычный астион
//         let response = await userAPI.follow( userId ) // добавил в уроке 66 после того, как перенес обращение на сервер в api
//         // .then( response => { // #90 закоментили потому что ввели await
//         if (response.data.resultCode == 0) {
//             dispatch( followSuccess( userId ) );
//         }
//         dispatch( toggleFollowingProgress( false, userId ) );
//         // } );
//     }
// }
//
// export const unfollow = ( userId ) => { // создаем ф-цию thunk. thunk -ф-ция, это ф-ция, которую создали в редьюсере которая диспатчит обычные астионы , которые делают асинхронную работу.
//
//     return async ( dispatch ) => {
//         dispatch( toggleFollowingProgress( true, userId ) ); // диспатчим обычный астион
//         let response = await userAPI.unfollow( userId ) // добавил в уроке 66 после того, как перенес обращение на сервер в api
//         // .then( response => { // #90 закоментили потому что ввели await
//         if (response.data.resultCode == 0) {
//             dispatch( unfollowSuccess( userId ) );
//         }
//         dispatch( toggleFollowingProgress( false, userId ) );
//         // } );
//     }
// }
//====БЫЛО=============================================================================================

