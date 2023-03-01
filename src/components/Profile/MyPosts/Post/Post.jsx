import React from 'react';
import s from './Post.module.css'


const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='https://klike.net/uploads/posts/2022-07/1657520750_2.jpg'></img>
            {props.message}
            <div>
                <span>like</span>
                {props.likesCount}
            </div>
        </div>
    )
}

export default Post;