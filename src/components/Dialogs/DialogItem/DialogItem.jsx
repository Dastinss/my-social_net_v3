import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return <div className={s.dialogs + ' ' + s.active}>
        <NavLink to={path}>
            <img className={s.message_avatar} src='https://klike.net/uploads/posts/2022-07/1657520715_1.jpg'></img>
            {props.name}
        </NavLink>
    </div>
}

export default DialogItem;