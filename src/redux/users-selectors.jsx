//№81 - хотя это не редюсер, но селекторы ближе к BLL, т.о. ставим в ряд с редюсерами

import { createSelector } from "reselect";

const getUsersSelector = (state) => { //83 даному более сложному селектору нужны юзеры и он их берет с помощью другого селектора более примитивного, по другому сделать нельзя, т.к. в последующем селекторе потребуется стейт, а мы его напрямую взять не сможем
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => { //83 по прежнему принимает стейт, но внутри скрыто: первым параметром передаем селектор (может быть массив, не массив), далее передаем (users) - то из чего в дальнешем выборка будет происходить, с помощью более примитивного селектора getUsers
    return users.filter(u => true); //83 на основании выборки (users) возвращаем результат, это ФЕЙКОВАЯ ФИЛЬТРАЦИЯ, мы ее используем чтобы применить суппер селектор
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}
