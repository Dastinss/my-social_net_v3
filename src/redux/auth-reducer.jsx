// Єто у нас BLL уровень !!! Єто бизнес логика - ОТ НЕЕ ОТТАЛКИВАЕМСЯ!!! UI (Users) - єто уже производная от BLL
//Все значения в state меняются через редьюсер

import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'; //#90 изменили имя актиона на уникальное, чтобы исключить возможность случайного дублирования с\но концепции redux-ducks

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
                ...action.payload, //в action создаем один обїект, назіваем его data и деструктуризируем его, его данные перезатрут данные ,которые были до этого
                // isAuth: true // 78 законектил, для того, чтобы если ВЫлогинились, то исчезала и кнопка \\ ранее - если пришли какие то пользовательские данные, то мы понимаем что пользователь залогинен
            }

        default:
            return state;
    }
};

export const setAuthUserData = ( userId, email, login, isAuth ) => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
}); // AC = ActionCreator ф-ция которая формирует и возвращает объект action

export const getAuthUserData = () => async ( dispatch ) => { // №90 добавили async и await //# 78 thunk делает ассинхронную операцию которая раньше делалсь в компоненте. принимает метод диспатч.
    // return authAPI.me() // me возвращает нам промис и мы на него "зенимся" (then) // #90 закоментили потому что ввели await
    let response = await authAPI.me() // me возвращает нам промис и мы на него "зенимся" (then) // #90
        // .then( response => { // подписываемся на этот промис с помощью then // #90 закоментили потому что ввели await
            if (response.data.resultCode === 0) { //проверка обязательная о том ,что если в респонсе в дате сидит resultCode = 0, то мы залогинены (берем из документации https://social-network.samuraijs.com/docs#auth_me_get инфо )  и только в этом случае мы должны задиспатчить эти авторизационные данные. Возьмем мы их из респонс
                let { id, email, login } = response.data.data; //делаем деструктуризацию
                dispatch( setAuthUserData( id, email, login, true ) ); // в наш редьюсер придут данніе о том ,кто мы такие. id ставим как в дата в документации разработчика, т.к. если поставить userId  то не подтянется, не заканектися
            }
        // } ); // #90 закоментили потому что ввели await
}

export const login = ( email, password, rememberMe ) => async ( dispatch ) => { // №90 добавили async и await //# 78 thunk делает ассинхронную операцию которая раньше делалсь в компоненте. принимает метод диспатч.  в даном случае задача санки - логиниться
    // authAPI.login( email, password, rememberMe ) // #90 закоментили потому что ввели await
    let response = await authAPI.login( email, password, rememberMe ) // #90
        // .then( response => { // подписываемся на этот промис с помощью then // #90 закоментили потому что ввели await
            if (response.data.resultCode === 0) { //проверка обязательная о том ,что если в респонсе в дате сидит resultCode = 0, то мы залогинены (берем из документации https://social-network.samuraijs.com/docs#auth_me_get инфо )  и только в этом случае мы должны задиспатчить эти авторизационные данные. Возьмем мы их из респонс
                dispatch( getAuthUserData() )
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
                dispatch( stopSubmit( 'login', { _error: message } )); // 79 -  показываем, что пользователь ввел неправильные данные при логировании. Для этого задиспатчиили актион, который получили с помощью АС stopSubmit.Первім параметром передали название формы, а вторым - обьект с ошибками для каждого филда, но указали не отдельные филды из нашей формы, а общую ошибку
            }
        // } ); // #90 закоментили потому что ввели await
}

export const logout = () => async ( dispatch ) => { // №90 добавили async и await //# 78 thunk делает ассинхронную операцию которая раньше делалсь в компоненте. принимает метод диспатч. в даном случае задача санки - ВЫлогиниться
    // authAPI.logout()// #90 закоментили потому что ввели await
    let response = await authAPI.logout() // #90 ввели await
        // .then( response => { // подписываемся на этот промис с помощью then // // #90 закоментили потому что ввели await
            if (response.data.resultCode === 0) { //проверка обязательная о том ,что если в респонсе в дате сидит resultCode = 0, то мы ВЫлогинены (берем из документации https://social-network.samuraijs.com/docs#auth_me_get инфо )  и только в этом случае мы должны задиспатчить эти авторизационные данные. Возьмем мы их из респонс
                dispatch( setAuthUserData( null, null, null, false ) )
            }
        // } ); // #90 закоментили потому что ввели await
}

export default authReducer;