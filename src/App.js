import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import state from "./redux/store";
import store from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = ( props ) => {
  return (
      <BrowserRouter>
        <div className='app-wrapper'>
          <Header/>
          <Navbar/>
          <div className='app-wrapper-content'>
            <Routes>
              <Route path="/dialogs"
                     // element={<Dialogs store={props.store} // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
                     // element={<DialogsContainer store={props.store} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext перестали передавать в нашу контейнерную компоненту что либо через пропсы т.е. дали доступ store ко всем компонентам внутри App
                     element={<DialogsContainer />}/>
              <Route path="/profile"
                     // element={<Profile store = {props.store} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext перестали передавать в нашу контейнерную компоненту что либо через пропсы т.е. дали доступ store ко всем компонентам внутри App

                         // profilePage={props.state.profilePage} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
                         // addPost={props.addPost}
                         // updateNewPostText={props.updateNewPostText}/>}/>

                         //заменили закоменченные выше два метода на один dispatch
                         // dispatch={props.dispatch} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
                     element={<Profile />}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>)
}

export default App;