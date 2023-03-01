import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => { // это контейнерная компонента, 'обертка', ее задача удовлетворить нужны презентационной компоненты MyPosts для которой она создавалась и удовлетворить ее необходимымы данными
  // let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>); // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
    // let newPostElement = React.createRef() // єто нужно запомнить, т.е. это внутренняя примочка Реакта. Делаем ссылку на добавление в дальнейшем Поста из ТехтЭриа // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer

    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch( addPostActionCreator());
    } // прокинули ф-цию addPost через props из state, т.е. фактически из BLL в наш UI

    let onPostChange = (text) => { // колл бек ф-ция которая принимает text как параметр и дальше делает всю логику за dispatch
        // let text = newPostElement.current.value; // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
        // props.updateNewPostText(text);// закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer

        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action)
    }

    return (
        <MyPosts
            updateNewPostText = { onPostChange }
            addPost = { addPost }
            posts = {state.profilePage.posts}
            newPostText = {state.profilePage.newPostText}
            />
    )
}

export default MyPostsContainer;