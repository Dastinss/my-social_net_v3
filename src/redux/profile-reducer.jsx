import state from "./store";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = { // одноразовый объект, стартовые данные
    posts: [
        { id: 1, message: "Hello! How are you?", likesCount: 0 },
        { id: 2, message: "It's my first post", likesCount: 20 },
        { id: 3, message: "BlaBla", likesCount: 11 },
        { id: 4, message: "DaDa", likesCount: 31 },
    ],
    newPostText: 'it-kamasutra.com', // вводим по умолчанию в textarea - типа хардкодим ее (урок 34)
    profile: null
};

const profileReducer = ( state = initialState, action ) => { // перенесли из store.js для реализации теории reducer урок 41

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };//делаем копию стейта, поскольку не имеем права менять исходник с\но правилу имьютабельности
            // state.posts.push( newPost ); // законектили в уроке 47 когда начали создавать копии см.ниже // ранее заменили this._state.profilePage просто не state, тк это нам пришло как составная часть state - см.(state, action)
            // stateCopy.posts = [...state.posts] //делаем копию массива из которого мы доставем эллементы, поскольку не имеем права менять исходник с\но правилу имьютабельности
            // stateCopy.posts.push( newPost ); // пушим уже в копию, а не в исходник
            // state.newPostText = ''; // законектили в уроке 47 когда начали создавать копии см.выше
            // stateCopy.newPostText = ''; // упростили
            // return state;
            // return stateCopy;// упростили
        }

        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
                // state.newPostText = action.newText; // законектили в уроке 47 когда начали создавать копии см.вЫше
                // stateCopy.newPostText = action.newPostText; // пушим уже в копию, а не в исходник
                // return state;
                // return stateCopy;  // упростили, удалили stateCopy и сразу вызвали элемент
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }

        }
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
export const setUserProfile = ( profile ) => ({ type: SET_USER_PROFILE, profile }); //ф-ция которая возвращает нам обьект - action, в котором инкапсулированы все данные, чтобы редьюсер получил этот action и применил эти изменения на свой стейт
export const updateNewPostTextActionCreator = ( text ) => (
    { type: UPDATE_NEW_POST_TEXT, newText: text }
);

export default profileReducer;