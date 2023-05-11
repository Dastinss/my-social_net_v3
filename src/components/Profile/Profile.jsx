import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { updateStatus } from "../../redux/profile-reducer";


const Profile = (props) => { // компонента просто рендерит ,ничего не делает
    return (
        <div>
            <ProfileInfo profile = {props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer
                // store = {props.store} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext перестали передавать в нашу контейнерную компоненту что либо через пропсы т.е. дали доступ store ко всем компонентам внутри App
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