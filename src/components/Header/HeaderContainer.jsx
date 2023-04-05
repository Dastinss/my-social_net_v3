import React from 'react';
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component { //классовая компонента должна обязательно раширять базовый класс реакт компонеты и обязательно должна в методе рендер jsx
    componentDidMount() { // метод жизненного цикла компоненты. в этом методе НУЖНО делать все сайд=эффекты. Компонента монтирует страничку только один раз
        axios.get( `https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true //специальный обьект в котором сидят настройки запроса, т.е. наша авторизованность на сайте в т.ч. Наш хедер уздает заовторизованы ли мы, и потом может эту инфо задиспатчить в редьюсер
            })
            .then( response => {
                if (response.data.resultCode === 0) { //проверка обязательная о том ,что если в респонсе в дате сидит resultCode = 0, то мы залогинены (берем из документации https://social-network.samuraijs.com/docs#auth_me_get инфо )  и только в этом случае мы должны задиспатчить эти авторизационные данные. Возьмем мы их из респонс
                    let {id, email, login} = response.data.data; //делаем деструктуризацию
                    // this.props.setAuthUserData(response.data.data.login) //data в response (т.е. response.data) - єто стандарная axios структура, но бек энд на камасутре также упаковал данные в data, поэтому и получился каламбур response.data.data
                    this.props.setAuthUserData(id, email, login) // в наш редьюсер придут данніе о том ,кто мы такие. id ставим как в дата в документации разработчика, т.к. если поставить userId  то не подтянется, не заканектися
                }
            } );
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth, // эти данные придут в  контейнерную компоненту HeaderContainer, которая прокинет их через <Header {...this.props} в Header, который из пропсов достанет и покажет в нав линк (const Header = (props) .... <NavLink)
    login: state.auth.login,// эти данные придут в  контейнерную компоненту HeaderContainer, которая прокинет их через <Header {...this.props} в Header, который из пропсов достанет и покажет в нав линк (const Header = (props) .... <NavLink)
});


export default connect (mapStateToProps, {setAuthUserData} )(HeaderContainer);