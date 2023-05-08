import React from 'react';
import { Navigate as Redirect } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = ( state ) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = ( Component ) => { // создали HOC которая занимается редиректом, в которую будем передавать нашу целевую компоненту с нужным параметром
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/> // вставляем редирект , т.е. вернем редирект если мы не авторизованы
            return <Component {...this.props}/>// все пропсы перекидываем в целевую компоненту
        }
    };

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent) // #69 ад из HOCов... как сказал Димыч - создали еще одну обертку для получения данных. Приконектили компоненту RedirectComponent к стору

    return ConnectedAuthRedirectComponent; // вернули наружу приконектченную к стору компоненту
}
// когда чел вызывает withAuthRedirect он получает две контейнерные компоненты одна в одной : сначала создаем конт компоненту RedirectComponent, а затем оборачиваем ее др конейнерной компонентой которая HOC с помощью connect