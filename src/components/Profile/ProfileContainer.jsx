import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";

class ProfileContainer extends React.Component { // делаем эту компоненту классовой чтобы иметь возможность сделать запрос
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2
        }
        axios.get( `https://social-network.samuraijs.com/api/1.0/profile/` + userId )
            .then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
                this.props.setUserProfile( response.data );
            } );
    }

    render() {  // обязательный метод класс компоненты , который возвращает разметку JSX
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}/> {/* передаем в презентационноую компоненту все пропсы ,которые пришли в классовую*/}
            </div>
        )
    }
}

let mapStateToProps = ( state ) => ({
    profile: state.profilePage.profile
})

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

let WithUrlDataContainerComponent = withRouter( ProfileContainer )

export default connect( mapStateToProps, { setUserProfile } )( WithUrlDataContainerComponent );