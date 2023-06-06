import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { getStatus, getUserProfile, setUserProfile, updateStatus } from "../../redux/profile-reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Navigate as Redirect } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component { // делаем эту компоненту классовой чтобы иметь возможность сделать запрос
    componentDidMount() { // показываем в Профайл то, когда не знаем что показывать
        let userId = this.props.router.params.userId;
        if (!userId) {
            // userId = 2 // 79 закоментил захардкодженный юзер Id
            userId = this.props.authorizedUserId // 79 дабавил свой профиль на загрузочную страницу вместо захардкоденной сверху, но this. - добавил поскольку подьзователь может быть не залогинен в этот момент времени
        }
        this.props.getUserProfile( userId ); // #67
        // userAPI.getProfile( userId ) // сделали так, чтобы компонентв не обращалась к ДАЛ уровню, поэтому закоментили
        //     // axios.get( `https://social-network.samuraijs.com/api/1.0/profile/` + userId ) // перенесли в апи в уроке 67
        //     .then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
        //         this.props.setUserProfile( response.data );
        //     } );
        this.props.getStatus( userId );// #73
    }

    render() {  // обязательный метод класс компоненты , который возвращает разметку JSX
        // if (!this.props.isAuth) return <Redirect to='/login' /> // урок 69 передали в конетейнерную компонету, ранее в // урок 68 делаем переадресацию на логин, если мы не залогинились (не показываем страничку вовсе)

        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile} status={this.props.status}
                         updateStatus={this.props.updateStatus}/> {/* передаем в презентационноую компоненту все пропсы ,которые пришли в классовую*/}
            </div>
        )
    }
}

let mapStateToProps = ( state ) => ({
    profile: state.profilePage.profile,
    // isAuth: state.auth.isAuth // #69 закоментил, т.к. создал еще одну "обертку"  mapStateToPropsForRedirect
    status: state.profilePage.status, // #73 хотим получить статус из стейта
    authorizedUserId: state.auth.userId, // #79 берем  auth из веточки в redux-store.jsx. В компоненту приходят єти данные
    isAuth: state.auth.isAuth // #79 берем  auth из веточки в redux-store.jsx. В компоненту приходят єти данные
})

//СТАЛО
export default compose(
    connect( mapStateToProps, { getUserProfile, getStatus, updateStatus } ), // в таком синтаксесе мы не сам thunk creator передаем , а создается в памяти отдельная ф-ция колбек внутри которой диспатчится thunk creator
    withRouter, withAuthRedirect
)( ProfileContainer )

// БЫЛО
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer); // #69 Вызвали HOC c нужным параметром, передав в него нужную компоненту
// // let AuthRedirectComponent = (props) => { // #69 закоментили передав ее в HOC, предварительно создав контейнерную компоненту над ProfileContainer
// //     if (!this.props.isAuth) return <Redirect to='/login'/> // вставляем редирект , т.е. вернем редирект если мы не авторизованы
// //     return <ProfileContainer {...props}/>// все пропсы перекидываем в целевую компоненту
// // }
// // let mapStateToPropsForRedirect = ( state ) => ({ # 69 перенесли в withAuthRedirect
// //     isAuth: state.auth.isAuth
// // })
// // AuthRedirectComponent = connect(mapStateToPropsForRedirect) (AuthRedirectComponent) // #69 ад из HOCов... как сказал Димыч - создали еще одну обертку для получения данных
// let WithUrlDataContainerComponent = withRouter( AuthRedirectComponent ) // передали контейнерную компоненту, которую построили над ProfileContainer, заменив ее
// export default connect( mapStateToProps, { getUserProfile } )( WithUrlDataContainerComponent );

function withRouter( Component ) { // добавил из комментариев к уроку 60, т.к. разбор Димыча устарел: withRouter вшитой в Реакт уже нет. Получается виесто нее создали ф-цию с таким же названием
    function ComponentWithRouterProp( props ) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
