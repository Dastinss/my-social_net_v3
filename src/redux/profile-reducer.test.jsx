import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

// 89 создаем тестировщик по принципу TDD (Test-Driven Development - разработка через тестирование), на примере профайла редьюсер

let state = { // скопировали старый стейт, чтобы не нарушать структуру
    posts: [
        { id: 1, message: "Hello! How are you???", likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 20 },
        { id: 3, message: "BlaBla", likesCount: 11 },
        { id: 4, message: "DaDa", likesCount: 31 },
    ],
};

test( 'length of post should be incremented', () => {
    // 1. test data (взяли данные)
    let action = addPostActionCreator('i will be cool developer');
    // 2. action (выполнили над данными действие)
    let newState = profileReducer(state, action); // передавем в редьюсер старый стейт state и актион action, т.е. должен в страром стейте появиться новый пост у которого будет текст 'i will be cool developer'

    // 3. expectation (ожидаем такой результат от действий п.2)
    expect(newState.posts.length).toBe(5);
} );

test( 'text of post should be correct', () => {
    // 1. test data (взяли данные)
    let action = addPostActionCreator('i will be cool developer');
    // 2. action (выполнили над данными действие)
    let newState = profileReducer(state, action); // передавем в редьюсер старый стейт state и актион action, т.е. должен в страром стейте появиться новый пост у которого будет текст 'i will be cool developer'

    // 3. expectation (ожидаем такой результат от действий п.2)
    expect(newState.posts[4].message).toBe('i will be cool developer');
} )

test( 'after deleting the length of messages should be decrement', () => {
    // 1. test data (взяли данные)
    let action = deletePost(1);
    // 2. action (выполнили над данными действие)
    let newState = profileReducer(state, action); // передавем в редьюсер старый стейт state и актион action, т.е. должен в страром стейте появиться новый пост у которого будет текст 'i will be cool developer'

    // 3. expectation (ожидаем такой результат от действий п.2)
    expect(newState.posts.length).toBe(3);
} );

test( 'after deleting the length should`n be decrement if id isn`t correct', () => {
    // 1. test data (взяли данные)
    let action = deletePost(1000);
    // 2. action (выполнили над данными действие)
    let newState = profileReducer(state, action); // передавем в редьюсер старый стейт state и актион action, т.е. должен в страром стейте появиться новый пост у которого будет текст 'i will be cool developer'

    // 3. expectation (ожидаем такой результат от действий п.2)
    expect(newState.posts.length).toBe(4);
} );