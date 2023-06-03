import state from "./store";
import { profileAPI, userAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'; //  #76  больше не апдейтим

let initialState = { // одноразовый объект, стартовые да//  #76 закоментил он нам в стейте не нуженнные
    posts: [
        { id: 1, message: "Hello! How are you???", likesCount: 0 },
        { id: 2, message: "It's my first post", likesCount: 20 },
        { id: 3, message: "BlaBla", likesCount: 11 },
        { id: 4, message: "DaDa", likesCount: 31 },
    ],
    // newPostText: 'it-kamasutra.com',  /// ренее  водим по умолчанию в textarea - типа хардкодим ее (урок 34)
    profile: null,
    status: '' // #73
};

const profileReducer = ( state = initialState, action ) => { // перенесли из store.js для реализации теории reducer урок 41

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                // newPostText: ''  // закоментил в 76 когда затирали это сво-во, т.к. его больше нет
            };//делаем копию стейта, поскольку не имеем права менять исходник с\но правилу имьютабельности
            // state.posts.push( newPost ); // законектили в уроке 47 когда начали создавать копии см.ниже // ранее заменили this._state.profilePage просто не state, тк это нам пришло как составная часть state - см.(state, action)
            // stateCopy.posts = [...state.posts] //делаем копию массива из которого мы доставем эллементы, поскольку не имеем права менять исходник с\но правилу имьютабельности
            // stateCopy.posts.push( newPost ); // пушим уже в копию, а не в исходник
            // state.newPostText = ''; // законектили в уроке 47 когда начали создавать копии см.выше
            // stateCopy.newPostText = ''; // упростили
            // return state;
            // return stateCopy;// упростили
        }

        // case UPDATE_NEW_POST_TEXT: { //#76  больше не апдейтим
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //         // state.newPostText = action.newText; // законектили в уроке 47 когда начали создавать копии см.вЫше
        //         // stateCopy.newPostText = action.newPostText; // пушим уже в копию, а не в исходник
        //         // return state;
        //         // return stateCopy;  // упростили, удалили stateCopy и сразу вызвали элемент
        //     }
        // }

        case SET_STATUS: { // #73 когда придет запрос из сервера мы хотим его засетать
            return {
                ...state,
                status: action.status // приходит новый статус   и мы его сетам в статус
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
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText }); // #75 добавили newPostText в объект и в непосредственно в актион
export const setUserProfile = ( profile ) => ({ type: SET_USER_PROFILE, profile }); //ф-ция которая возвращает нам обьект - action, в котором инкапсулированы все данные, чтобы редьюсер получил этот action и применил эти изменения на свой стейт
export const setStatus = ( status ) => ({ type: SET_STATUS, status }); // #73 ф-ция которая возвращает нам обьект - action, в котором инкапсулированы все данные, чтобы редьюсер получил этот action и применил эти изменения на свой стейт

export const getUserProfile = ( userId ) => ( dispatch ) => { // создаем санку - ф-цию, которая принимаем ф-цию диспатч и делает внутри какието ассинхронные операции и различные мелкие астины
    userAPI.getProfile( userId ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
        dispatch( setUserProfile( response.data ) );
    } );
}

export const getStatus = ( userId ) => ( dispatch ) => { // # 73 создаем санку - ф-цию, которая принимаем ф-цию диспатч и делает внутри какието ассинхронные операции и различные мелкие астины
    profileAPI.getStatus( userId )
        .then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
            dispatch( setStatus( response.data ) ); // когда плучим статус, мы его засетаем
        } );
}

export const updateStatus = ( status ) => ( dispatch ) => { // # 73 создаем санку - ф-цию, которая принимаем ф-цию диспатч и делает внутри какието ассинхронные операции и различные мелкие астины
    profileAPI.updateStatus( status )
        .then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
            if (response.data.resultCode === 0) {
                dispatch( setStatus( status ) ); // когда плучим статус, мы его засетаем
            }
        } );
}

// export const updateNewPostTextActionCreator = ( text ) => ( //  #76  больше не апдейтим
//     { type: UPDATE_NEW_POST_TEXT, newText: text }
// );

export default profileReducer;