import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import usersReducer, {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC
} from "../../redux/users-reducer";
import users from "./Users";

let mapStateToProps = ( state ) => { //наша компонента через пропсы получит значения ниже (они первоначально формируются в usersReducer)
    return {
        users: state.usersPage.users, // с помощью mapStateToProps придет в ф-циональную компоненту Users в пропсах будет сидеть св-во users: значением которого будут пользователи из стейта (.users)
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage //чтобы наша компонента в пропсах получила это значение
    }
}

let mapDispatchToProps = ( dispatch ) => { //ф-ция которая приходит из react-redux библиотеки, задача которой скрыть нам store, subscribe, dispatch, т.е. упрощает єтот мех=зм. Она служит для того, чтобы передавать в ф-циональную компоненту Users через пропсы колл-беки (назначение которых общаться со стейтом), т.е. какие то ф-ции, которые она сможет вызывать
    return {
        folllow: ( userId ) => { // это ф-ция которая будет диспатчить акшн криэйтер указывая какого пользователя нужно зафоловить
            dispatch( followAC( userId ) ); // мы диспатчим результат работы АС , который вызывает нам action
        },

        unfollow: ( userId ) => {
            dispatch( unfollowAC( userId ) );
        },

        setUsers: ( users ) => { //человек попадает на страничку, которая (презент.компонента) берет откудато пользователей, задиспатчивает их в стейт, а потом когда они приходят она их отрисовывает
            dispatch( setUsersAC( users ) );
        },

        setCurrentPage: ( pageNumber ) => {
            dispatch( setCurrentPageAC( pageNumber ) );
        },

        setTotalUsersCount: ( totalCount ) => {
            dispatch( setTotalUsersCountAC( totalCount ) );
        }


    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Users );
//детально описывается характер работы в уроке 55 на 00:55:00 - 01:02:00 минутах
// наш Users, т.е. наша компонента ты получишь все эти пропсы с помощью connect и мы закинем в тебя эти все пропсы
// с помощью этих двух супер ф-ций ( mapStateToProps, mapDispatchToProps ):
// mapStateToProps - возвращает объект который нам по итогу из стейта достает свойства, значения, данные
// mapDispatchToProps - ф-ция возвращающая обьект, в котором есть колбеки ,скажем так. Каждый колл бек диспатчит что то по итогу в стор и там что то происходит.
// Что то там произошло и заново срабатывает ф-ция mapStateToProps
// connect - библиотека\ф-ция, с помощью которая и скрывают store, subscribe, dispatch


