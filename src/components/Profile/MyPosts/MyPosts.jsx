import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import { Field, reduxForm } from "redux-form";

const AddNewPostForm = ( props ) => { //76 выделили в отдельную компоненту
    return (
        <form
            onSubmit={props.handleSubmit}> {/* // handleSubmit специальный метод, который к нам придет из redux-form из контейнерной компоненты, которая получается после оборачивания HOCом*/}
            <div>
                <Field name='newPostText' component='textarea' placeholder='Enter your post'/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm( { form: 'ProfileAddNewPostForm' } )( AddNewPostForm )

const MyPosts = ( props ) => {
// let postsData = [
//     {id: 1, message: "Hi! How are you?", likesCount: 0},
//     {id: 2, message: "It's my first post", likesCount: 20},
//     {id: 3, message: "BlaBla", likesCount: 11},
//     {id: 4, message: "DaDa", likesCount: 31},
// ]

    let postsElements = props.posts.map( p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/> ); // добавил САМ!!! key={p.id}, т.к. ругалась система!!! УРА!!!))

    let newPostElement = React.createRef() // єто нужно запомнить, т.е. это внутренняя примочка Реакта. Делаем ссылку на добавление в дальнейшем Поста из ТехтЭриа

    let onAddPost = ( values ) => { // #76 добавил values и values.newPostText
        // let text = newPostElement.current.value; // удалили ,т.к. в addPost нет смысла добавлять этот текст, т.к. он все равно не на что не влияет (см.урок 34 29:24)
        // props.updateNewPostText(''); // перенесли зануление в store.js, тк єто бизнес функция
        props.addPost( values.newPostText );

        //заменили закоменченный выше метода на dispatch
        // props.dispatch( {type: 'ADD-POST'} );
        // props.dispatch( addPostActionCreator()) // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
    } // прокинули ф-цию addPost через props из state, т.е. фактически из BLL в наш UI

// let onPostChange = () => { // 76 закоментил, т.к. добавили другую логику / ранее - когда нажимаем на клавиши, то MyPosts в котором содержится текстэриа , берет ее и вызывет колл бэк ф-цию
//     let text = newPostElement.current.value;
//     // console.log(text)
//     props.updateNewPostText( text );
//
//     //заменили закоменченный выше метод на dispatch
//     // let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text };
//     // let action = updateNewPostTextActionCreator(text); // закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
//     // props.dispatch(action)// закоментили в уроке 43 когда создали контейнерную компоненту MyPostsContainer
// }

    return (
        //урок 32 добавили value в textarea и в нее из пропсов newPostText , которое нам приходит через вводимую строку в store.js, из которой в свою очередь попадает на єкран - это круговорот FLEX!
        <div className={s.postsBlock}>
            <h3>MyPosts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div>
                {/*<div> // урок 76 перенесли в отдельную компоненту*/}
                {/*    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <button onClick={onAddPost}>Add post</button>*/}
                {/*</div>*/}
            </div>
            <div className={s.posts}>
                {postsElements}
                {/*<Post message={postsData[0].message} likesCount={postsData[0].likesCount}/>*/}
                {/*<Post message={postsData[1].message} likesCount={postsData[1].likesCount}/>*/}

                {/*<Post message="It's my first post" likesCount=' 20'/>*/}

            </div>
        </div>
    )
}

export default MyPosts;