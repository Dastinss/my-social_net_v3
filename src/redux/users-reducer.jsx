// Єто у нас BLL уровень !!! Єто бизнес логика - ОТ НЕЕ ОТТАЛКИВАЕМСЯ!!! UI (Users) - єто уже производная от BLL

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_CURRENT_USERS_COUNT = 'SET_CURRENT_USERS_COUNT';

let initialState = {
    users: [], // в state есть пустой массив в нем пользователи кот счас нет и которых мы запрашиваем с сервера и потом сюда сетаем
    pageSize: 5, // захардкодили количество страниц
    totalUsersCount: 0, // мы не знаем сколько юзеров, пока не уйдет запрос на сервер и пока мы не узнаем ответ
    currentPage: 1 // текущая страница (которая подсвечивается среди прочихЖ 12345)
};

const usersReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: [...state.users] - создаем копию, но лучше делать через мар, т.к. нам нужно изменить только один обїект, а вытащить его проще через мар
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true } // если ID совпадает, то возвращаем копию обекта, если не совпадает - то возвращаем сам обїект
                    }
                    return u;
                } )
            }

        case UNFOLLOW :
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                } )
            }

        case SET_USERS : {
            // return { ...state, users: action.users } // если откуда то придут пользователи, то мы должны взять старый стейт, взять пользователей которые там были и перезатереть их теми пользователямя, которые пришли в action
            return { ...state, users: action.users }// если откуда то придут пользователи, то мы должны взять старый стейт, взять пользователей которые там были и ДОБАВИТЬ (склеить) к ним тех пользователей, которые пришли в action
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }// меняем currentPage на тот Page который сидит в action
        }

        case SET_CURRENT_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }// меняем currentPage на тот Page который сидит в action
        }

        default:
            return state;
    }
};

export const followAC = ( userId ) => ({ type: FOLLOW, userId }); // AC = ActionCreator ф-ция которая формирует и возвращает action
export const unfollowAC = ( userId ) => ({ type: UNFOLLOW, userId });
export const setUsersAC = ( users ) => ({ type: SET_USERS, users });
export const setCurrentPageAC = ( currentPage ) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCountAC = ( totalUsersCount ) => ({ type: SET_CURRENT_USERS_COUNT, count : totalUsersCount });


export default usersReducer;