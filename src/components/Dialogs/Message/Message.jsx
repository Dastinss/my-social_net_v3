import React from 'react';
import s from './../Dialogs.module.css'


const Message = (props) => {
    let newElement = React.createRef()
    let addMessage = () => {
        let text = newElement.current.value;
        alert(text)
    }
    return (
        <>
            <div className={s.message}>{props.message}</div>
            <textarea ref={newElement}></textarea>
            <button onClick={addMessage}>addMessage</button>
        </>
    )
}

export default Message;