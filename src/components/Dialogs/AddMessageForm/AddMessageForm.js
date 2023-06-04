import React from "react";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../Common/FormsControls/FormsControls";


const maxLength50 = maxLengthCreator(50)

export const AddMessageForm = ( props ) => { //76 выделили в отдельную компоненту
    return (
        <form
            onSubmit={props.handleSubmit}> {/* // handleSubmit специальный метод, который к нам придет из redux-form из контейнерной компоненты, которая получается после оборачивания HOCом*/}
            <div>
                <Field component={Textarea} name='newMessageBody' placeholder='Enter your message'
                       validate={[required, maxLength50]}/>
                {/*<textarea value={newMessageBody}*/}
                {/*  onChange={onNewMessageChange}*/}
                {/*  placeholder={'Enter your message'}></textarea>*/}
            </div>
            <div>
                <button>Send</button>
            </div>
            {/*<div><button onClick={onSendMessageClick}>Send</button></div>*/}
        </form>
    )
}

export const AddMessageFormRedux = reduxForm( { form: 'dialogAddMessageForm' } )( AddMessageForm );