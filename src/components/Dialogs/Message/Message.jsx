import React from 'react';
import s from './../Dialogs.module.css'


const Message = (props) => {
    let newElement = React.createRef()
    let addMessage = () => {
        let text = newElement.current.value;
    //     // alert(text) // моё
    }
    return (
        <>
            <div >{props.message}</div>
            {/*<div className={s.message}>{props.message}</div>// моё )*/}
            {/*<textarea ref={newElement}></textarea>// моё ) */}
            {/*<button onClick={addMessage}>addMessage</button>// моё )*/}
        </>
    )
}

export default Message;