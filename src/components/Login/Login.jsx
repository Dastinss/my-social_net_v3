import React from 'react';
import { formToJSON } from "axios";
import { Field, reduxForm } from "redux-form";

const LoginForm = ( props ) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                  <Field placeholder={'Login'} name={'login'} component={'input'}/>{/*#75 добавил имя name={УКАЗЫВАЕМ свойство} для отправки на сервер имени данного элемента куда мы вводим данные*/}
                {/*<input placeholder={'Login'}/> // #75 заменили на Field (по сути контейнерная компонента. которая рисует др компоненту) из билиотеки reduxForm*/}
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={'input'}/>
                {/*<input placeholder={'Password'} // #75 заменили на Field (по сути контейнерная компонента. которая рисует др компоненту)из билиотеки reduxForm/>*/}
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'}/> remember me
                {/*<input type={'checkbox'}/> remember me // #75 заменили на Field (по сути контейнерная компонента. которая рисует др компоненту)из билиотеки reduxForm/>*!/*/}
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART! #73 скопировал из сайта ReduxForm. Это HOC, которой мы оборачиваем этой контейнерной компонентой, она прокидывает особые пропсы в нашу форму, особый кол-бэк
                  form: 'login',                                // a unique name for this form, ЄТО имя никак не связано с словом form в redux-store.jsx, где оно означает название стейта в глобальном нашем общем стейте с которым работает formReduser
                  // fields: ['firstName', 'lastName', 'email'] // all the fields in your form
              })(LoginForm);                                    // передаем форму вокруг которой нужно создать эту РедаксФорм

const Login = ( props ) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit = {onSubmit}/> {/*// ресуем контейнерную компоненту, которую мы получили*/}
    </div>
};

export default Login;