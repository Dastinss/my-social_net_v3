import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC } from "../../redux/users-reducer";
import users from "./Users";

let mapStateToProps = ( state ) => {
    return {
        users: state.usersPage.users // с помощью mapStateToProps придет в ф-циональную компоненту Users в пропсах будет сидеть св-во users: значением которого будут пользователи из стейта (.users)
    }
}

let mapDispatchToProps = ( dispatch ) => { //ф-ция которая служит для того, чтобы передавать в ф-циональную компоненту Users через пропсы колл-беки (назначение которых общаться со стейтом), т.е. какие то ф-ции, которые она сможет вызывать
    return {
        folllow: ( userId ) => { // это ф-ция которая будет диспатчить акшн криэйтер указывая какого пользователя нужно зафоловить
            dispatch( followAC( userId ) ); // мы диспатчим результат работы АС , который вызывает нам action
        },

        unfollow: ( userId ) => {
            dispatch( unfollowAC( userId ) );
        },

        setUsers: ( users ) => { //человек попадает на страничку, которая (презент.компонента) берет откудато пользователей, задиспатчивает их в стейт, а потом когда они приходят она их отрисовывает
            dispatch( setUsersAC( users ) );
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Users );