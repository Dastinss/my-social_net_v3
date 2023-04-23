import React from 'react';
import './App.css';
// import Header from './components/Header/Header'; // закоментил в уроке 61 когда ввел контейнерную компоненту , т.е. обертку для Header
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import state from "./redux/store";
import store from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";

const App = ( props ) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                {/*<Header/> // закоментил в уроке 61 когда ввел контейнерную компоненту , т.е. обертку для Header*/}
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/dialogs"
                            // element={<Dialogs store={props.store} // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
                            // element={<DialogsContainer store={props.store} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext перестали передавать в нашу контейнерную компоненту что либо через пропсы т.е. дали доступ store ко всем компонентам внутри App
                               element={<DialogsContainer/>}/>
                        <Route path="/profile/:userId?" // после урока 59 добавил /* в Route path="/profile/*" из комментов к уроку 59, т.к. без этого не отображался корректно добавляемый user
                            // element={<Profile store = {props.store} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext перестали передавать в нашу контейнерную компоненту что либо через пропсы т.е. дали доступ store ко всем компонентам внутри App

                            // profilePage={props.state.profilePage} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
                            // addPost={props.addPost}
                            // updateNewPostText={props.updateNewPostText}/>}/>

                            //заменили закоменченные выше два метода на один dispatch
                            // dispatch={props.dispatch} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
                            //    element={<Profile/>}/> // закоментили в уроке 59 когда создали контейнерную компоненту для Profile
                               element={<ProfileContainer/>}/>

                        <Route path="/users"
                               element={<UsersContainer/>}/>

                        <Route path="/login"
                               element={<LoginPage/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>)
}

export default App;