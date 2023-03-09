import {combineReducers, legacy_createStore as createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({ // єто ф-ция, которая соединяет четыре наших редьюсера (т.е. четыре ВЕТКИ нашего стейта , т.е. св-ва каждое из которыъ яв-ся методом), т.е. которой мы передаем объект (ключ: значение)
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer // ветка usersPage обслуживается usersReducer_ом
});

let store = createStore(reducers); // создаем редаксовский стор с помощью этой ф-ции которой передаем закомбайененные редьюсеры

window.store = store;

export default store;


