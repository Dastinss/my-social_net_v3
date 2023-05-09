// контейнерная компонента (делает грязную работу), задача которой общаться со стейтом с помощью mstp & mdtp. Брать из стора нужніе данніе, коллбеки и прокидывать их в нашу презент.компоненту Users c помощью коннекта.
import React from 'react';
import { connect } from 'react-redux';
import usersReducer, {
    follow,
    unfollow,
    setCurrentPage,
    // setTotalUsersCount, // закоментил в уроке 66 т.к. пеоенесли многое в санки в usersReducer
    // setUsers, // закоментил в уроке 66 т.к. пеоенесли многое в санки в usersReducer
    // toggleFetching, // закоментил в уроке 66 т.к. пеоенесли многое в санки в usersReducer
    toggleFollowingProgress,
    getUsersThunkCreator, // ввели в уроке 66 и там же заменили на простой getUsers
    getUsers,
} from '../../redux/users-reducer';
import axios, { defaults } from 'axios';
import Users from './Users';
import Preloader from "../Common/Preloader/Preloader";
import { userAPI } from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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
        // axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, // закоментил в уроке 63 когда вынесли запрос этот в отдельную компоненту api уровня DAL
        //     {
        //         withCredentials: true
        //     } )

        this.props.getUsers( this.props.currentPage, this.props.pageSize );
        // this.props.toggleFetching( true ); // закоментил после переноса в БЛЛ usersReducer, т.к. єто хотя и конейнерная, но все же тупая компонента
        // userAPI.getUsers(this.props.currentPage, this.props.pageSize).then( data => { // импортируем ф-цию с запросом с api. "Пинаем" API, а потом когда приходит результат, мы пинаем бизнес (this.props.setUsers( data.items ))
        //     this.props.toggleFetching( false );
        //     this.props.setUsers( data.items );
        //     this.props.setTotalUsersCount( data.totalCount ); //мы хотим что то с компоненты UI отправить в state, нам нужен для єтого колл бек, который передают через пропсы. Значит такой колл бек который что то меняет в state приходит из mapDispatchToProps
        // } );
    }

    onPageChanger = ( pageNumber ) => { //вынесли сюда ф-цию по кликанию на страницах (12345), точнее создали метод, т.к. это классовая компонента
        this.props.getUsers( pageNumber, this.props.pageSize ); // заменил одной строкой в уроке 66 строки ниже

        // this.props.setCurrentPage( pageNumber ); // заменил одной строкой в уроке 66 строки, т.к. єти диспатчи имкапсулированы в санки
        // this.props.toggleFetching( true ); // заменил одной строкой в уроке 66 строки, т.к. єти диспатчи имкапсулированы в санки
        //
        // axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, // закоментил в уроке 63 когда вынесли запрос этот в отдельную компоненту api уровня DAL
        //     {
        //         withCredentials: true
        //     } )
        // userAPI.getUsers(pageNumber, this.props.pageSize).then( data => { // заменил одной строкой в уроке 66 строки, т.к. єти диспатчи имкапсулированы в санки //делаем запрос на сервер с гет запросом для которого достаточно урл адреса, и говорим "когда сервак даст ответ, затем выполни этот колл бек/эту ф-цию" в которую в качестве ответа от сервера придет респонс
        //     this.props.toggleFetching( false ); // заменил одной строкой в уроке 66 строки, т.к. єти диспатчи имкапсулированы в санки
        //     this.props.setUsers( data.items );// заменил одной строкой в уроке 66 строки, т.к. єти диспатчи имкапсулированы в санки
        // } );
    }

    render() { // обязательный метод, т.к. именно метод render возвращает JSX. props сюда не приходят. ЭТО делает Реакт в ПЕРВУЮ очередь - сначала рисуется НИЧЕГО :)

        return <>
            {this.props.isFetching ? <Preloader/> : null}
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
                // toggleFollowingProgress={this.props.toggleFollowingProgress} // закоментил в уроке 66
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = ( state ) => { //ф-ция которая возвращает обьект, передается в connect, кот ее вызывает. наша компонента через пропсы получит значения ниже (они первоначально формируются в usersReducer)
    return {
        users: state.usersPage.users, // с помощью mapStateToProps придет в ф-циональную компоненту Users в пропсах будет сидеть св-во users: значением которого будут пользователи из стейта (.users)
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage, //чтобы наша компонента в пропсах получила это значение
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

//СТАЛО
export default compose(
    withAuthRedirect,
    connect( mapStateToProps,
        { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers } )
)( UsersContainer );

// let withRedirect = withAuthRedirect(UsersContainer) // #69 законектил, т.к. обенрнул ХОКом непосредственно коннект предварительно для редайректинга (чтобі не залогиненный пользователь не мог заходить на страницц юзер) запихиваем контейнерную компоненту в HOC и ее уже отдать внутрь connect

// БЫЛО
// export default withAuthRedirect(connect( mapStateToProps,
//     { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers } )( UsersContainer )); // в пропсы приходит не сам АС, коннект из этого АС сам создаст колл бек. который внутри сам задиспатчит то, что вернет АС

//закоментили less # 58, т.к. перенесли в connect эту ф-цию mapDispatchToProps, не как ф-цию, а как объекты ,которые она содержит одновременно зарефакторив в usersReducer то, но что ссылается колбеки с этой "удаленной" ф-ции
// let mapDispatchToProps = ( dispatch ) => { //ф-ция которая возвращает обьект, передается в connect, кот ее вызывает. приходит из react-redux библиотеки, задача которой скрыть нам store, subscribe, dispatch, т.е. упрощает єтот мех=зм. Она служит для того, чтобы передавать в ф-циональную компоненту Users через пропсы колл-беки (назначение которых общаться со стейтом), т.е. какие то ф-ции, которые она сможет вызывать
//     return {
//         follow: ( userId ) => { // это ф-ция которая будет диспатчить акшн криэйтер указывая какого пользователя нужно зафоловить
//             dispatch( followAC( userId ) ); // мы диспатчим результат работы АС , который вызывает нам action
//         },
//         unfollow: ( userId ) => {
//             dispatch( unfollowAC( userId ) );
//         },
//         setUsers: ( users ) => { //человек попадает на страничку, которая (презент.компонента) берет откудато пользователей, задиспатчивает их в стейт, а потом когда они приходят она их отрисовывает
//             dispatch( setUsersAC( users ) );
//         },
//         setCurrentPage: ( pageNumber ) => {
//             dispatch( setCurrentPageAC( pageNumber ) );
//         },
//         setTotalUsersCount: ( totalCount ) => {
//             dispatch( setTotalUsersCountAC( totalCount ) );
//         },
//         toggleFetching: ( isFetching ) => {
//             dispatch( toggleFetchingAC( isFetching ) );
//         },
//     }
// }

// export default connect( mapStateToProps, mapDispatchToProps )( UsersContainer ); // Коннект создает новую компоненту с помощью старой
//детально описывается характер работы в уроке 55 на 00:55:00 - 01:02:00 минутах + урок 56 28:00 - 29:00
// наш Users, т.е. наша компонента ты получишь все эти пропсы с помощью connect и мы закинем в тебя эти все пропсы
// с помощью этих двух супер ф-ций ( mapStateToProps, mapDispatchToProps ):
// mapStateToProps - возвращает объект который нам по итогу из стейта достает свойства, значения, данные
// mapDispatchToProps - ф-ция возвращающая обьект, в котором есть колбеки ,скажем так. Каждый колл бек диспатчит что то по итогу в стор и там что то происходит.
// Что то там произошло и заново срабатывает ф-ция mapStateToProps
// connect - библиотека\ф-ция, с помощью которая и скрывают store, subscribe, dispatch