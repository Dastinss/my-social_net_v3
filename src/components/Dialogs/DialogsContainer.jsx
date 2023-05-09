import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
// import StoreContext from "../../StoreContext"; // // закоментили в уроке 45 когда создали контейнерную компоненту SuperDialogsContainer
import { connect } from "react-redux";
// import { Navigate as Redirect } from "react-router-dom";
// import { Navigate as Redirect } from "react-router/dist/lib/components";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

//создаем две ф-ции с помощью которых настраиваем наш connect, т.е. коннектим нашу компоненту Диалогс к Стору
let mapStateToProps = ( state ) => { //ф-ция задача которой замапить часть стейта в пропсы. к store у нас доступа уже нет, потому обращаемся к state у которого просто берем dialogsPage
    return {
        dialogsPage: state.dialogsPage, // Dialogs перересуйся, если изменится объект dialogsPage
        // isAuth: state.auth.isAuth // закоментил, т.к. перенес все редиректы в withAuthRedirect - автоматически это происходит в AuthRedirectComponent строка 33
    }
}

let mapDispatchToProps = ( dispatch ) => { // настраивает колл беки которые мы будем отправлять в нашу през.компоненту
    return {
        sendMessage: () => {
            dispatch( sendMessageCreator() )
        },
        updateNewMessageBody: ( body ) => {
            dispatch( updateNewMessageBodyCreator( body ) )
        },
    }
}

// БЫЛО
// let AuthRedirectComponent = withAuthRedirect( Dialogs ); // #69 Вызвали HOC c нужным параметром, передав в него нужную компоненту
// // let AuthRedirectComponent = (props) => { // // #69 закоментили передав ее в HOC, предварительно создав контейнерную компоненту над Dialogs
// //     if (!this.props.isAuth) return <Redirect to='/login'/> // вставляем редирект , т.е. вернем редирект если мы не авторизованы
// //     return <Dialogs {...props}/>// все пропсы перекидываем в целевую компоненту
// // }
// // урок 45 создаем новую контейнерную компоненту в react-redux c помощью комманды connect . при єтом старую выше не удаляем
// const DialogsContainer = connect( mapStateToProps, mapDispatchToProps )( AuthRedirectComponent ); // // передали контейнерную компоненту, которую построили над Dialogs, заменив ее// ранее создали конт компоненту по имени Dialogs внутри которой она рендерит презентационную компоненту, внутрь которой в качестве пропсов передает те св-ва, которые сидят в этих двух обектахexport default DialogsContainer;
// export default DialogsContainer;

// СТАЛО в №70 после оборачивание трех ф-ций в compose и сразу ее экспортирование без создания переменной
export default compose(
    connect( mapStateToProps, mapDispatchToProps ), // 3. рез-ат отработки 2.\ передается сюда, в ф-цию connect, которая вызывается дважды - сначала вызывается, создается нам HOC в которую мы потом закидываем нашу компоненту
    withAuthRedirect // 2. пеекидывается автоматом Dialogs в withAuthRedirect и которая также автоматом вызывается
)( Dialogs ) // 1. взяли обьект над которым "издеваемся" и который переходит по "конввееру"

// const DialogsContainer = ( props ) => { // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
// const DialogsContainer = ( ) => { // закоментили в уроке 45 когда создали контейнерную компоненту SuperDialogsContainer созданной автоматом реакт-редакс вместо этой, созданной вручную
//
//     // let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>); // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
//     // let messagesElements = state.messages.map(m => <Message message={m.message}/>); // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
//     // let newMessageBody = state.newMessageBody; // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
//
//     return <StoreContext.Consumer>
//         {  store => {
//             // let state = props.store.getState().dialogsPage; // забрали весь стейт (в отличие от Profile куда передали только Dispatch) в уроке 40 после чего удалили props ниже // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//             // let state = store.getState().dialogsPage; // забрали весь стейт (в отличие от Profile куда передали только Dispatch) в уроке 40 после чего удалили props ниже
//
//             // let onSendMessageClick = () => { props.store.dispatch( sendMessageCreator() ); } // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//             let onSendMessageClick = () => {
//                 store.dispatch( sendMessageCreator() );
//             }
//
//             let onNewMessageChange = ( body ) => {
//                 // let body = event.target.value; // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
//                 // props.store.dispatch( updateNewMessageBodyCreator( body ) ); // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//                 store.dispatch( updateNewMessageBodyCreator( body ) );
//             }
//
//             return <Dialogs
//                 updateNewMessageBody={onNewMessageChange}
//                 sendMessage={onSendMessageClick}
//                 // dialogsPage={state} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//                 dialogsPage={store.getState().dialogsPage}
//             />
//         }
//     }
//     </StoreContext.Consumer>
// }
// export default DialogsContainer;
