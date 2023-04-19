// Єто у нас BLL уровень !!! Єто бизнес логика - ОТ НЕЕ ОТТАЛКИВАЕМСЯ!!! UI (Users) - єто уже производная от BLL
//Все значения в state меняются через редьюсер

import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false // состояние которое четко говорит "не залогинен", т.е. не нужно делать комбинацию из ид, емейл, логин - то есть того нет
};

const authReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case SET_USER_DATA: //из сервера приходят в action данные по нашей авторизации которые нужны редьюсеру для преобразования стейта. РЕдьюсер также может взять какие то данные из текущего стейта
            return {
                ...state,
                ...action.data, //в action создаем один обїект, назіваем его data и деструктуризируем его, его данные перезатрут данные ,которые были до этого
                isAuth: true // если пришли какие то пользовательские данные, то мы понимаем что пользователь залогинен
            }

        default:
            return state;
    }
};

export const setAuthUserData = ( userId, email, login ) => ({ type: SET_USER_DATA, data: {userId, email, login} }); // AC = ActionCreator ф-ция которая формирует и возвращает обтект action
export const getAuthUserData = () => (dispatch) => { // thunk делает ассинхронную операцию которая раньше делалсь в компоненте
    authAPI.me()
        .then( response => { // подписываемся на этот промис с помощью then
            if (response.data.resultCode === 0) { //проверка обязательная о том ,что если в респонсе в дате сидит resultCode = 0, то мы залогинены (берем из документации https://social-network.samuraijs.com/docs#auth_me_get инфо )  и только в этом случае мы должны задиспатчить эти авторизационные данные. Возьмем мы их из респонс
                let { id, email, login } = response.data.data; //делаем деструктуризацию
                dispatch(setAuthUserData( id, email, login )); // в наш редьюсер придут данніе о том ,кто мы такие. id ставим как в дата в документации разработчика, т.к. если поставить userId  то не подтянется, не заканектися
            }
        } );
}

export default authReducer;