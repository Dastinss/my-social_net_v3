// контейнерная компонента, задача которой общаться со стейтом с помощью mstp & mdtp. Брать из стора нужніе данніе, коллбеки и прокидывать их в нашу презент.компоненту Users c помощью коннекта.

import React from 'react';
import { connect } from 'react-redux';
import usersReducer, {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleFetchingAC,
    unfollowAC
} from '../../redux/users-reducer';
import axios from 'axios';
import Users from './Users';
import preloader from './../../assets/images/loader2.svg';
import Preloader from "../Common/Preloader/Preloader";

//Это классовая компонента!!! Работет через колл беки, берет все время у пропсов что то
// (которые приходят из mapDispatchToProps в UsersContainer.jsx). Сделали класс компоненту из функциональной , которую удалили в уроке 53
class UsersContainer extends React.Component { // без extends React.Component с этой компонентой React не сможет взаимодействовать
    // constructor( props ) { // закоментили в уроке 53 когда перенесли запрос ajax в  componentDidMount
    //     super( props );
    //     axios.get( 'https://social-network.samuraijs.com/api/1.0/users' ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
    //         this.props.setUsers( response.data.items );
    //     } );
    // };
    componentDidMount() { // метод жизненного цикла компоненты. в этом методе НУЖНО делать все сайд=эффекты. Компонента монтирует страничку только один раз
        this.props.toggleFetching( true );
        axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}` ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
            this.props.toggleFetching( false );
            this.props.setUsers( response.data.items );
            this.props.setTotalUsersCount( response.data.totalCount ); //мы хотим что то с компоненты UI отправить в state, нам нужен для єтого колл бек, который передают через пропсы. Значит такой колл бек который что то меняет в state приходит из mapDispatchToProps
        } );
    }

    onPageChanger = ( pageNumber ) => { //вынесли сюда ф-цию по кликанию на страницах (12345), точнее создали метод, т.к. это классовая компонента
        this.props.setCurrentPage( pageNumber );
        this.props.toggleFetching( true );
        axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}` ).then( response => { //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
            this.props.toggleFetching( false );
            this.props.setUsers( response.data.items );
        } );
    }

    render() { // обязательный метод, т.к. именно метод render возвращает JSX. props сюда не приходят. ЭТО делает Реакт в ПЕРВУЮ очередь - сначала рисуется НИЧЕГО :)

        return <>
            {this.props.isFetching ? <Preloader /> : null}
                {/*// <div> Перенеслм круилку в отдельную компонету Preloader/!*если данные получаются, то отображаем картинку-крутилку*!/*/}
                {/*//     <img src={preloader} />*/}
                {/*// </div>*/}
            <Users
                totalUsersCount={this.props.totalUsersCount} // передаем в Users только то, что ей нужно для того, чтобі она могла отрисоваться. ЧтобЫ достучаться к Users, нужно сначала достучаться к UsersContainer
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanger={this.onPageChanger}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        </>
    }
}

let mapStateToProps = ( state ) => { //наша компонента через пропсы получит значения ниже (они первоначально формируются в usersReducer)
    return {
        users: state.usersPage.users, // с помощью mapStateToProps придет в ф-циональную компоненту Users в пропсах будет сидеть св-во users: значением которого будут пользователи из стейта (.users)
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage, //чтобы наша компонента в пропсах получила это значение
        isFetching: state.usersPage.isFetching
    }
}

let mapDispatchToProps = ( dispatch ) => { //ф-ция которая приходит из react-redux библиотеки, задача которой скрыть нам store, subscribe, dispatch, т.е. упрощает єтот мех=зм. Она служит для того, чтобы передавать в ф-циональную компоненту Users через пропсы колл-беки (назначение которых общаться со стейтом), т.е. какие то ф-ции, которые она сможет вызывать
    return {
        follow: ( userId ) => { // это ф-ция которая будет диспатчить акшн криэйтер указывая какого пользователя нужно зафоловить
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
        },

        toggleFetching: ( isFetching ) => {
            dispatch( toggleFetchingAC( isFetching ) );
        },

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( UsersContainer ); // Коннект создает новую компоненту с помощью старой
//детально описывается характер работы в уроке 55 на 00:55:00 - 01:02:00 минутах + урок 56 28:00 - 29:00
// наш Users, т.е. наша компонента ты получишь все эти пропсы с помощью connect и мы закинем в тебя эти все пропсы
// с помощью этих двух супер ф-ций ( mapStateToProps, mapDispatchToProps ):
// mapStateToProps - возвращает объект который нам по итогу из стейта достает свойства, значения, данные
// mapDispatchToProps - ф-ция возвращающая обьект, в котором есть колбеки ,скажем так. Каждый колл бек диспатчит что то по итогу в стор и там что то происходит.
// Что то там произошло и заново срабатывает ф-ция mapStateToProps
// connect - библиотека\ф-ция, с помощью которая и скрывают store, subscribe, dispatch


