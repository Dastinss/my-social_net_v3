import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
// import StoreContext from "../../../StoreContext"; // закоментили в уроке 45 когда создали контейнерную компоненту SuperMyPostsContainer

let mapStateToProps = (state) => { // запускается эта ф-ция каждый раз когда у нас в стейте происходит изменение и формируется (ретурн) новый объект который сравнивается со старым оььектом
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        updateNewPostText: ( text ) => {
            let action = updateNewPostTextActionCreator( text );
            dispatch( action );
        },

        addPost: () => {
            dispatch( addPostActionCreator() );
        }
    }
}

const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;



// const MyPostsContainer = ( props ) => { // это контейнерная компонента, 'обертка', ее задача удовлетворить нужны презентационной компоненты MyPosts для которой она создавалась и удовлетворить ее необходимымы данными // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )

// закоментили в уроке 45 когда создали контейнерную компоненту SuperMyPostsContainer
// const MyPostsContainer = () => { // это контейнерная компонента, 'обертка', ее задача удовлетворить нужны презентационной компоненты MyPosts для которой она создавалась и удовлетворить ее необходимымы данными
//     // let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>); // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
//     // let newPostElement = React.createRef() // єто нужно запомнить, т.е. это внутренняя примочка Реакта. Делаем ссылку на добавление в дальнейшем Поста из ТехтЭриа // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
//
//     return (
//         //назначили MyPostsContainer потребителем родительского контекста store , обернув его в соответствующий тег
//         <StoreContext.Consumer>
//             {
//                 ( store ) => {
//                     // let state = props.store.getState(); // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//                     let state = store.getState();
//                     let addPost = () => {
//                         // props.store.dispatch( addPostActionCreator() ); // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//                         store.dispatch( addPostActionCreator() );
//                     } // прокинули ф-цию addPost через props из state, т.е. фактически из BLL в наш UI
//
//                     let onPostChange = ( text ) => { // колл бек ф-ция которая принимает text как параметр и дальше делает всю логику за dispatch
//                         // let text = newPostElement.current.value; // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
//                         // props.updateNewPostText(text);// закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
//                         let action = updateNewPostTextActionCreator( text );
//                         // props.store.dispatch( action ) // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//                         store.dispatch( action );
//                     }
//
//                     return <MyPosts
//                         updateNewPostText={onPostChange}
//                         addPost={addPost}
//                         // posts={state.profilePage.posts} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//                         posts={state.profilePage.posts}
//                         // newPostText={state.profilePage.newPostText} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store по другому, не через пропс а через параметр, который приходит в ф-цию ( store )
//                         newPostText={state.profilePage.newPostText}
//                     />
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }