//№81 - хотя это не редюсер, но селекторы ближе к BLL, т.о. ставим в ряд с редюсерами

import { createSelector } from "reselect";

const getUsersSelector = (state) => { //83 заменили название с getUsers на getUsersSelector, чтобы ниже показатать, как более сложный селектор построить на результате более примативного селектора
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => { //83 данному более сложному селектору нужны юзеры и он их берет с помощью другого селектора более примитивного getUsersSelector, по другому сделать нельзя, т.к. в последующем селекторе потребуется стейт, а мы его напрямую взять не сможем. По прежнему принимает стейт, но внутри скрыто: первым параметром передаем селектор (может быть массив, не массив), далее передаем (users) - то из чего в дальнейшем выборка будет происходить, с помощью более примитивного селектора getUsersSelector
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
