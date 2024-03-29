import React, { lazy } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import store from "./redux/store";
import HeaderContainer from "./components/Header/HeaderContainer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer"; //94 закоментили т.к. меняем на "ленивую загрузку"
// import UsersContainer from "./components/Users/UsersContainer"; //94 закоментили т.к. меняем на "ленивую загрузку"
// import ProfileContainer from "./components/Profile/ProfileContainer"; //94 закоментили т.к. меняем на "ленивую загрузку"
// import LoginPage from "./components/Login/Login"; //94 закоментили т.к. меняем на "ленивую загрузку"
import { connect, Provider } from "react-redux";
import { getAuthUserData } from "./redux/auth-reducer";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";

const DialogsContainer = lazy( () => import('./components/Dialogs/DialogsContainer') ); //94 запускаем "ленивую загрузку" компоненты DialogsContainer с https://react.dev/reference/react/lazy
const UsersContainer = lazy( () => import("./components/Users/UsersContainer"));//94 запускаем "ленивую загрузку" компоненты DialogsContainer с https://react.dev/reference/react/lazy
const  ProfileContainer = lazy( () => import("./components/Profile/ProfileContainer"));//94 запускаем "ленивую загрузку" компоненты DialogsContainer с https://react.dev/reference/react/lazy
const  LoginPage = lazy( () => import("./components/Login/Login"));//94 запускаем "ленивую загрузку" компоненты DialogsContainer с https://react.dev/reference/react/lazy


class App extends React.Component { // 80 через гарячие клавиши сделали из функциональной классовую кампоненту,т.к. нам нужем метод жизненного цикла. все сноски оставил
	componentDidMount() { // #80 перенесли из HeaderContainer. метод жизненного цикла компоненты. в этом методе НУЖНО делать все сайд=эффекты. Компонента монтирует страничку только один раз
		this.props.initializeApp();
	}

	render() { // 80 возвращаем всю разметку только когда проинициализированы, в противном случае показываем сплеш скрин (окно загрузки)
		if (!this.props.initialized) {
			return <Preloader/>
		}
		return (
			// <BrowserRouter> {/* //#90 перенесли в idex.js т.к. Арр нельзя было оборачивать BrowserRouter-ом*/}
			<div className='app-wrapper'>
				{/*<Header/> // закоментил в уроке 61 когда ввел контейнерную компоненту , т.е. обертку для Header*/}
				<HeaderContainer/>
				<Navbar/>
				<div className='app-wrapper-content'>
					<React.Suspense fallback={<div><Preloader/></div>}>
						<Routes>
							<Route path="/dialogs"
								// element={<Dialogs store={props.store} // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
								// element={<DialogsContainer store={props.store} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext перестали передавать в нашу контейнерную компоненту что либо через пропсы т.е. дали доступ store ко всем компонентам внутри App
								   element={<DialogsContainer/>}/>

							<Route
								path="/profile/:userId?" // после урока 59 добавил /* в Route path="/profile/*" из комментов к уроку 59, т.к. без этого не отображался корректно добавляемый user
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
					</React.Suspense>
				</div>
			</div>
	// </BrowserRouter>
	)
	}
}

const mapStateToProps = ( state ) => ({
	initialized: state.app.initialized // 80 ф-ция получила стейт и вернула обьект в котором будет initialized Теперь наш арр получит знания про то проинициализировано оно или нет
})

let AppContainer = compose( // 92 создали переменную и присвоили ей значения с урока 80
	connect( mapStateToProps, { initializeApp } ) )( App );

let SamuraiJSApp = ( props ) => { // 92 создали главную Арр-шку, которая будет делать все что делали в index.js
	return <BrowserRouter>
		<Provider store={store}>
			<AppContainer/>
		</Provider>
	</BrowserRouter>
}

export default SamuraiJSApp;

// export default compose( // 92 закоментил, т.к. для тестирования создали новую переменную AppContainer и присвоили ей значения // ранее 80 добавил метод compose, но не добавлял метод withRouter, т.к. он не импортируется
//     connect( mapStateToProps, { initializeApp } ) )( App ); //80 добавил. диспатчим тут санку initializeApp
// export default App; // 80 закоментил, т.к. выше обернул все  в коннект для экспорта getAuthUserData

//Закоментил в #80 т.к. сделали из функциональной классовую компоненту. Цель - добавить в App компоненту метод жизненного цикла, к тому же она не чистая, поскольку рендерит контейнерніе компоненті, следовательно толку от нее мало. . Переносим из Header запрос касательно запроса на сервер (?)... . А посольку функциональная компонета типа чистая, то не можем делать асинхронные запросы
//     return (
//         <BrowserRouter>
//             <div className='app-wrapper'>
//                 {/*<Header/> // закоментил в уроке 61 когда ввел контейнерную компоненту , т.е. обертку для Header*/}
//                 <HeaderContainer/>
//                 <Navbar/>
//                 <div className='app-wrapper-content'>
//                     <Routes>
//                         <Route path="/dialogs"
//                             // element={<Dialogs store={props.store} // закоментили в уроке 43 когда создали контейнерную компоненту DialogsContainer
//                             // element={<DialogsContainer store={props.store} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext перестали передавать в нашу контейнерную компоненту что либо через пропсы т.е. дали доступ store ко всем компонентам внутри App
//                                element={<DialogsContainer/>}/>
//                         <Route path="/profile/:userId?" // после урока 59 добавил /* в Route path="/profile/*" из комментов к уроку 59, т.к. без этого не отображался корректно добавляемый user
//                             // element={<Profile store = {props.store} // закоментили в уроке 44 когда создали контейнерную компоненту StoreContext перестали передавать в нашу контейнерную компоненту что либо через пропсы т.е. дали доступ store ко всем компонентам внутри App
//
//                             // profilePage={props.state.profilePage} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
//                             // addPost={props.addPost}
//                             // updateNewPostText={props.updateNewPostText}/>}/>
//
//                             //заменили закоменченные выше два метода на один dispatch
//                             // dispatch={props.dispatch} // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
//                             //    element={<Profile/>}/> // закоментили в уроке 59 когда создали контейнерную компоненту для Profile
//                                element={<ProfileContainer/>}/>
//
//                         <Route path="/users"
//                                element={<UsersContainer/>}/>
//
//                         <Route path="/login"
//                                element={<LoginPage/>}/>
//                     </Routes>
//                 </div>
//             </div>
//         </BrowserRouter>)
// }
//
// export default App;