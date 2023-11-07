import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk" // промежуточный уровень , который мы внедряем в наш стор
import { reducer, reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

let reducers = combineReducers({ // єто ф-ция, которая соединяет четыре наших редьюсера (т.е. четыре ВЕТКИ нашего стейта , т.е. св-ва каждое из которыъ яв-ся методом), т.е. которой мы передаем объект (ключ: значение)
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer, // ветка usersPage обслуживается usersReducer_ом
    auth: authReducer,
    form: formReducer, // #75 редьюсер formReduser (установленная библиотека) должен называться обязательно form:
    app: appReducer // #80 за арр отвечает appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // 91 добавил из https://github.com/reduxjs/redux-devtools/tree/main/extension#installation для chrome extensions для redux
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware)); // 91 закоментил, т.к. создали выше глобальный стор// ранее создаем редаксовский стор с помощью этой ф-ции которой передаем закомбайененные редьюсеры, в уроке 66 добавили applyMiddleware для редакс thunk

window.__store__ = store; // 91 добавили __стор__, чтобы не затерлось и не затерялось

export default store;