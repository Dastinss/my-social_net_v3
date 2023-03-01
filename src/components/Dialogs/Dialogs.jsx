import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";

// let dialogs = [
//     <DialogItem name = {dialogsData[0].name} id= {dialogsData[0].id}/>,
//     ..... и тд
// ]

const Dialogs = ( props ) => {

    let state = props.dialogsPage; // в этой ф-циональной компоненте забываем про store (см. строку ниже) и сразу получаем минимум данных которые им необходимы
    // let state = props.store.getState().dialogsPage; // забрали весь стейт (в отличие от Profile куда передали только Dispatch) в уроке 40 после чего удалили props ниже // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer

    // let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    // let messagesElements = props.state.messages.map(m => <Message message={m.message}/>);
    // let newMessageBody = props.state.newMessageBody; //отображаем внутри value, но чтобы он менялся, т.е. приходил другой, крепим событие onChange

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} id={d.id}/> );
    let messagesElements = state.messages.map( m => <Message message={m.message}/> );
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        // props.store.dispatch(sendMessageCreator()); // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
        props.sendMessage(); //хотим сообщить, что нажалась кнопка и мы хотим отправить сообщение
    }

    let onNewMessageChange = ( event ) => {
        let body = event.target.value;
        props.updateNewMessageBody( body );
        // props.store.dispatch(updateNewMessageBodyCreator(body)); // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}

                {/*<DialogItem name = {dialogsData[0].name} id= {dialogsData[0].id}/>*/}
                {/* и т.д. такие же єлементы*/}

                {/*<DialogItem name="Misha" id="1"/>*/}
                {/* и т.д. такие же єлементы*/}
            </div>
            <div className={s.messages}>

                <div>{messagesElements}</div>
                {/*<Message message={messagesData[0].message}/>*/}
                {/* и т.д. такие же єлементы*/}
                <div>
                    <div><textarea value={newMessageBody}
                                   onChange={onNewMessageChange}
                                   placeholder={'Enter your message'}></textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;