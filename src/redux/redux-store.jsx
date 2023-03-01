import {combineReducers, legacy_createStore as createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let reducers = combineReducers({ // єто ф-ция, которая соединяет три наших редьюсера (т.е. три св-ва каждое из которыъ яв-ся методом), т.е. которой мы передаем объект (ключ: значение)
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
});

let store = createStore(reducers);

export default store;
