import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => { // компонента просто рендерит ,ничего не делает
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                store = {props.store}
                // posts={props.profilePage.posts} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
                // newPostText={props.profilePage.newPostText} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
                // dispatch={props.dispatch} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
            />

            {/*<MyPosts posts={props.profilePage.posts} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer*/}
            {/*         newPostText={props.profilePage.newPostText}*/}
            {/*    // updateNewPostText={props.updateNewPostText}*/}
            {/*    // addPost={props.addPost}*/}

            {/*    //заменили закоменченные выше два метода на один dispatch*/}
            {/*         dispatch={props.dispatch}*/}
            {/*/>*/}
        </div>)
}

export default Profile;