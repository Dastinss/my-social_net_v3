import state from "./store";
import profileReducer from "./profile-reducer";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'; //создали новую константу для добавления нового действия
const SEND_MESSAGE = 'SEND-MESSAGE'; //создали новую константу для добавления нового действия

let initialState = { // одноразовый объект, стартовые данные
    dialogs: [
        { id: 1, name: 'Misha' },
        { id: 2, name: 'Anya' },
        { id: 3, name: 'Mama' },
        { id: 4, name: 'Kolya' },
        { id: 5, name: 'Slava' },
        { id: 6, name: 'Bogdana' }
    ],
    messages: [
        { id: 1, message: 'Hello!!' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
        { id: 6, message: 'Not bad' }
    ],
    newMessageBody: ''
};

export const dialogsReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return { ...state, newMessageBody: action.body };
        // stateCopy.newMessageBody = action.body; // заоефакторили см.выше
        // state.newMessageBody = action.body; // законектили в уроке 48 когда начали создавать копии см.ниже
        // return state;
        // return stateCopy;// упростили, удалили stateCopy и сразу вызвали элемент

        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, { id: 6, message: body }]
            }; //не поверхностная копия но и не полная копия, т.к. нет dialogs и newMessageBody. НО не делаем их копиии т.к. они не меняются

        // state.newMessageBody = ''; //занулили что написано
        // stateCopy.newMessageBody = ''; // заоефакторили см.выше
        // state.messages.push({id: 6, message: body});
        // stateCopy.messages.push( { id: 6, message: body } ); // заоефакторили см.выше PUSH счас практически не исп-ся
        // return state;

        default:
            return state;
    }
}
//
// if (action.type === UPDATE_NEW_MESSAGE_BODY) { //пользователь вводит сообщение и говорит чтобы его отправили
//     state.newMessageBody = action.body; //изменили стейт
//     // this._callSubscriber(this._state)   // удалили т.к. никого не уведомляем. см пройфайл редюсеп
//     // сообщаем внешнему миру, что стейт изменился через метод, которому передаем єтот изменившийся стейт
// } else if (action.type === SEND_MESSAGE) {
//     let body = state.newMessageBody;
//     state.newMessageBody = ''; //занулили что написано
//     state.messages.push({id: 6, message: body});
//     // this._callSubscriber(this._state)// удалили т.к. никого не уведомляем. см пройфайл редюсеп
// }
// return state;

//перенесли с store.js
export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = ( body ) => (
    { type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;