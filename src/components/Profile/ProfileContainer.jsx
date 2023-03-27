import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";

class ProfileContainer extends React.Component { // делаем эту компоненту классовой чтобы иметь возможность сделать запрос
    componentDidMount() {
        axios.get( `https://social-network.samuraijs.com/api/1.0/profile/2` )
            .then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
                this.props.setUserProfile( response.data );
            } );
    }

    render() {  // обязательный метод класс компоненты , который возвращает разметку JSX
        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile} /> {/* передаем в презентационноую компоненту все пропсы ,которые пришли в классовую*/}
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect( mapStateToProps, { setUserProfile } )( ProfileContainer );