const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

let initialState = { // одноразовый объект, стартовые данные
    users: [
        {
            id: 1,
            followed: false,
            fullName: 'Sergiy',
            status: 'I am a boss',
            location: { city: 'Kharkiv', country: 'Ukraine' }
        },
        {
            id: 2,
            followed: true,
            fullName: 'Mike',
            status: 'I am a boss too',
            location: { city: 'Munchen', country: 'Germany' }
        },
        {
            id: 1,
            followed: false,
            fullName: 'Kolya',
            status: 'I am a captain',
            location: { city: 'Moscow', country: 'Russia' }
        },
    ],
};

const usersReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case FOLLOW:

        case UNFOLLOW:
            
        default:
            return state;
    }
};

export const followAC = ( userID ) => ({ type: FOLLOW, userID }); // AC = ActionCreator ф-ция которая формирует и возвращает action

export const unfollowAC = ( userID ) => ({ type: UNFOLLOW, userID });

export default usersReducer;