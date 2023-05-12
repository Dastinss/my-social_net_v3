import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk" // промежуточный уровень , который мы внедряем в наш стор
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({ // єто ф-ция, которая соединяет четыре наших редьюсера (т.е. четыре ВЕТКИ нашего стейта , т.е. св-ва каждое из которыъ яв-ся методом), т.е. которой мы передаем объект (ключ: значение)
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer, // ветка usersPage обслуживается usersReducer_ом
    auth: authReducer,
    form: formReducer // #75 редьюсер formReduser (установленная библиотека) должен называться обязательно form:
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware)); // создаем редаксовский стор с помощью этой ф-ции которой передаем закомбайененные редьюсеры, в уроке 66 добавили applyMiddleware для редакс thunk

window.store = store;

export default store;