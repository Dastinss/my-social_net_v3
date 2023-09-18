// Єто у нас BLL уровень !!! Єто бизнес логика - ОТ НЕЕ ОТТАЛКИВАЕМСЯ!!! UI (Users) - єто уже производная от BLL
//Все значения в state меняются через редьюсер
//создали в #80 создаем понять, что мы проинициализировались при входе в нашу сеть - этот редьюсер отвечает за все арр

import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false // сначала у нас непроинициализированное состояние
};

const appReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS: //если такой актион бахнется сюда, то мы заменим initialized на true
            return {
                ...state, //стратегическая штука, мы можем убрать, если будет только одно свойство initialized, но оставляем если будет несколько
                initialized: true //в action создаем один обїект, его данные перезатрут данные ,которые были до этого
            }

        default:
            return state;
    }
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS }); // нам просто нужно задиспатчить этот экшн, т.о. параметров никаких нет. AC = ActionCreator ф-ция которая формирует и возвращает обтект action

export const initializeApp = () => ( dispatch ) => { // thunk делает ассинхронную операцию которая раньше делалсь в компоненте, в єтой санке делаем что то для инициализации.Эту санку будем диспатчить в Арр
    let promise = dispatch( getAuthUserData() ); // задисипатчим получение инициализационных/аутаризационных данных из auth-reducer.jsx. диспатч вернет нам то, что мы ретурнем из ф=ции, которая в него заключена (?), в даном случае из санки
    dispatch( initializedSuccess() ); // проинициализировано только после того, как все выше ассинхронные независимые диспатчи завершатся
    Promise.all([promise]) // заварачиваем каждый промис в массив (у нас пока только один промис)
        .then( () => { // когда промис (все промисы) зарезолвится (т.е. ассинхронная операция закончится), тогда значит инициализация завершена
        dispatch(initializedSuccess())
    } )
}

export default appReducer;