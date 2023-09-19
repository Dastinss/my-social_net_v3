import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import state, {subscriber} from "./redux/state";
// import store from "./redux/store"; // закоментили после добавления redux
import store from "./redux/redux-store";
import './index.css';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import StoreContext, { Provider } from "./StoreContext"; // удалил урок 45 компоненту StoreContext после установки библиотеки react-redux
// import {addPost, updateNewPostText} from "./redux/state";

// все что ниже перенесли из index.js и возвращаем туда в виде ф-ции rerenderEnrireTree для того ,чтобы перерисвывать каждый раз все дерево и не было циклической ссылки (см. уроу № 33. Уроки React JS)
// до 35 урока было все в отдельном файле render.js, после чего перенесли все в index.js (точнее вернули все туда)

// setInterval( () => { // 83 - тестировали reselector
//     store.dispatch ({type: 'FAKE'})
// }, 1000 )

const root = ReactDOM.createRoot( document.getElementById( 'root' ) ); // ВОТ ЭТА СТРОКА - ее скопировал с каментов с урока 34, т.к. біла ошибка изза обновления
//let rerenderEnrireTree = ( state ) => { // убрали перерисовку в уроке 47 после того как в уроке 46 добавили connect, который внутри себя сам делает ЕДИНОЖДЫ ОТРИСОВКУ
root.render(
    <React.StrictMode>
        <BrowserRouter>{/* //#90 перенесли из Арр т.к. нельзя его было оборачивать BrowserRouter-ом*/}
            <Provider store={store}>
                {/*<App state={state} //везде заменили state на store._state, а далее на getState () т.к. напрямую к приватному св-ву обращаться не можем*/}
                {/*     addPost={store.addPost.bind(store)} // отдавая свой метод кому то и хотим, чтобы владелец этого метода сохранился, мы должны этот метод забендить (связать через bind) с владельцем этого метода поэтому стоит два раза store*/}
                {/*     updateNewPostText={store.updateNewPostText.bind(store)}/>*/}

                {/*//заменили закоменченные выше два метода на один dispatch*/}
                {/*<App state={state} dispatch={store.dispatch.bind( store )} store={store}/> // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext т.е. дали доступ store ко всем компонентам внутри App*/}
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

//}

// <App state={state} addPost={(message)=>{alert('Hi, I am only dump componennt' + message)}}/>

// убрали перерисовку в уроке 47 после того как в уроке 46 добавили connect, который внутри себя сам делает перерисовку
//rerenderEnrireTree( store.getState() ); // тут не бандим bind, поскольку вызываем ф-цию от стора, а не посылаем ее куда то как addPost или updateNewPostText

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// store.subscribe( () => { // убрали подписку в уроке 47 после того как в уроке 46 добавили connect, который внутри себя сам содержит локальную подписку
//     let state = store.getState();
//     rerenderEnrireTree( state );
// } );
