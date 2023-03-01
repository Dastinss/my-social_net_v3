import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

// const DialogsContainer = ( props ) => { // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
const DialogsContainer = ( ) => {

    // let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>); // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
    // let messagesElements = state.messages.map(m => <Message message={m.message}/>); // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
    // let newMessageBody = state.newMessageBody; // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer

    return <StoreContext.Consumer>
        {  store => {
            // let state = props.store.getState().dialogsPage; // забрали весь стейт (в отличие от Profile куда передали только Dispatch) в уроке 40 после чего удалили props ниже // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
            // let state = store.getState().dialogsPage; // забрали весь стейт (в отличие от Profile куда передали только Dispatch) в уроке 40 после чего удалили props ниже

            // let onSendMessageClick = () => { props.store.dispatch( sendMessageCreator() ); } // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
            let onSendMessageClick = () => {
                store.dispatch( sendMessageCreator() );
            }

            let onNewMessageChange = ( body ) => {
                // let body = event.target.value; // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
                // props.store.dispatch( updateNewMessageBodyCreator( body ) ); // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
                store.dispatch( updateNewMessageBodyCreator( body ) );
            }

            return <Dialogs
                updateNewMessageBody={onNewMessageChange}
                sendMessage={onSendMessageClick}
                // dialogsPage={state} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
                dialogsPage={store.getState().dialogsPage}
            />
        }
    }
    </StoreContext.Consumer>
}

export default DialogsContainer;