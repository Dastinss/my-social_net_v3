// это DAL уровень
import axios, { create } from "axios";

const instance = axios.create( { // единожды настроили instance и далее используем его везде
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`, // базовый который автоматичеси будет приклеиваться к строке
    headers: {
        "API-KEY": "a7ac1bc5-0d23-4742-ab18-200ee19c5490"
    }
} ); // это отдельный экземпляр axios, это вспомогательная ф-ция, которая помогает единожды настроить связь с конретной api,  с конеретной версией

export const userAPI = { // создали обьект который содержит методы, это упаковка для всех методов для группировки
    getUsers( currentPage = 1, pageSize = 10 ) {//ф-ция которая делает запрос на сервер, возвращает нам промис. Вызываем getUsers в контейнерной компоненте. currentPage & pageSize передает тот, кто вызывает эту ф-цию, т.е. берем их из параметров
        // return axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, // изначальный запрос
        // return instance.get( baseURL + `users?page=${currentPage}&count=${pageSize}`
        return instance.get( `users?page=${currentPage}&count=${pageSize}` )
            // ,
            // {
            //     withCredentials: true // закоментил после переноса в instance
            // } )
            .then( response => {
                return response.data;
            } ) //забираем из response только то, что нам нужно, т.к. приходит очень много деталей. Т.е. ретурнем не то, что передаем нам get, а то, что передает нам then
    },
    follow( userId ) { // перенес в уроке 66 с Users и убрал все ненужное, что есть в instance вверху
        return instance.post( `follow/${userId}`) //вторым параметром почетому передаем пустой обьект - раскажут позднее
    },
    unfollow( userId ) { // перенес в уроке 66 с Users и убрал все ненужное, что есть в instance вверху
        return instance.delete( `follow/${userId}`)  //НЕ принимает второй параметр - раскажут позднее. Вторым параметром идет параметр настройки
    },
    getProfile(userId){ // перенесли с ProfileContainer #67
        return instance.get( `profile/` + userId );
    },
}

export const authAPI = { // создали обьект который содержит методы, это упаковка для всех методов для группировки
    me() {
        return instance.get( `auth/me`)
    }
}

//ШО ЗА ХЕРЬ?! у Димыча в уроке 66 на 21:39 этого нет!! удалил...
// export const getUsers2 = ( currentPage = 1, pageSize = 10 ) => {//ф-ция которая делает запрос на сервер, возвращает нам промис. Вызываем getUsers в контейнерной компоненте. currentPage & pageSize передает тот, кто вызывает эту ф-цию, т.е. берем их из параметров
//     // return instance.get( baseURL + `follow?page=${currentPage}&count=${pageSize}`
//     return instance.get( `follow?page=${currentPage}&count=${pageSize}`)
//         // ,
//         // {
//         //     withCredentials: true // закоментил после переноса в instance
//         // } )
//         .then( response => {
//             return response.data;
//         } ); //забираем из response только то, что нам нужно, т.к. приходит очень много деталей. Т.е. ретурнем не то, что передаем нам get, а то, что передает нам then
// }