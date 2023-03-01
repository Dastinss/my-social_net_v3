import state from "./store";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let  initialState = { // одноразовый объект, стартовые данные
    posts: [
        {id: 1, message: "Hello! How are you?", likesCount: 0},
        {id: 2, message: "It's my first post", likesCount: 20},
        {id: 3, message: "BlaBla", likesCount: 11},
        {id: 4, message: "DaDa", likesCount: 31},
    ],
    newPostText: 'it-kamasutra.com' // вводим по умолчанию в textarea - типа хардкодим ее (урок 34)
};

const profileReducer = ( state = initialState, action ) => { // перенесли из store.js для реализации теории reducer урок 41
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likelikesCount: 0
            };
            state.posts.push( newPost ); // заменили this._state.profilePage просто не state, тк это нам пришло как составная часть state - см.(state, action)
            state.newPostText = '';
            return state;

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;

        default:
            return state;

        //зарефакторили выше то, что описано ниже if/else
        // if (action.type === ADD_POST) {                       //перенесли в dispatch. Далее заменили с if (action.type === 'ADD-POST') на то что прописано
        //     let newPost = {
        //         id: 5,
        //         message: state.newPostText,
        //         likelikesCount: 0
        //     };
        //     state.posts.push(newPost); // заменили this._state.profilePage просто не state, тк это нам пришло как составная часть state - см.(state, action)
        //     state.newPostText = '';
        //     // this._callSubscriber(this._state); // удалили т.к. никого не уведомляем о каких либо изменениях: мы тут преобразовывем а не вызываем. возвращаем преобразованный стейт
        // } else if (action.type === UPDATE_NEW_POST_TEXT) {    //перенесли в dispatch
        //     state.newPostText = action.newText;
        //     // this._callSubscriber(this._state); // удалили т.к. никого не уведомляем о каких либо изменениях: мы тут преобразовывем а не вызываем. возвращаем преобразованный стейт
        // }
        // return state;
    }
};

//перенесли с store.js
export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = ( text ) => (
    { type: UPDATE_NEW_POST_TEXT, newText: text }
);

export default profileReducer;