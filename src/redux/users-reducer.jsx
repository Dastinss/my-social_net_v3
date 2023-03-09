// Єто у нас BLL уровень !!!

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [ ]
};

const usersReducer = ( state = initialState, action ) => {

        switch (action.type) {
            case FOLLOW:
                return {
                    ...state,
                    // users: [...state.users] - создаем копию, но лучше делать через мар, т.к. нам нужно изменить только один обїект, а вытащить его проще через мар
                    users: state.users.map( u => {
                        if (u.id === action.userID) {
                            return { ...u, followed : true } // если ID совпадает, то возвращаем копию обекта, если не совпадает - то возвращаем сам обїект
                        }
                        return u;
                    } )
                }

            case UNFOLLOW :
                return {
                    ...state,
                    users: state.users.map ( u => {
                        if (u.id === action.userID) {
                            return { ...u, followed: false }
                        }
                        return u;
                    })
                }

            case SET_USERS : {
                // return { ...state, users: action.users } // если откуда то придут пользователи, то мы должны взять старый стейт, взять пользователей которые там были и перезатереть их теми пользователямя, которые пришли в action
                return { ...state, users: [ ...state.users, ...action.users ] }// если откуда то придут пользователи, то мы должны взять старый стейт, взять пользователей которые там были и ДОБАВИТЬ (склеить) к ним тех пользователей, которые пришли в action
            }

            default:
                return state;
        }
    };

export const followAC = ( userID ) => ({ type: FOLLOW, userID }); // AC = ActionCreator ф-ция которая формирует и возвращает action
export const unfollowAC = ( userID ) => ({ type: UNFOLLOW, userID });
export const setUsersAC = ( users ) => ({ type: SET_USERS, users });

export default usersReducer;