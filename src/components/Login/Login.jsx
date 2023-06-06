import React from 'react';
import { formToJSON } from "axios";
import { Field, reduxForm } from "redux-form";
import { Input } from "../Common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router";
import { Redirect } from 'react-router';
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from './../Common/FormsControls/FormsControls.module.css'

const LoginForm = ( props ) => {
    return (
        <form
            onSubmit={props.handleSubmit}> {/*у любой формы есть событие onSubmit, поскольку в пропсах есть handleSubmit (приходит из контейнерной компоненты), мы хотим доверить ему оработку сабмита*/}
            <div>
                <Field placeholder={'Email'} name={'email'}
                       component={Input}
                       validate={[required]}/>{/*#75 добавил имя name={УКАЗЫВАЕМ свойство} для отправки на сервер имени данного элемента куда мы вводим данные §77 добавили валидацию - ф-цию Input, validate={[required]}*/}
                {/*<input placeholder={'Login'}/> // #75 заменили на Field (по сути контейнерная компонента. которая рисует др компоненту) из билиотеки reduxForm*/}
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'}
                       component={Input}
                       validate={[required]}/>
                {/*<input placeholder={'Password'} // #75 заменили на Field (по сути контейнерная компонента. которая рисует др компоненту)из билиотеки reduxForm/>*/}
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> remember me
                {/*<input type={'checkbox'}/> remember me // #75 заменили на Field (по сути контейнерная компонента. которая рисует др компоненту)из билиотеки reduxForm/>*!/*/}
            </div>
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm( { // <----- THIS IS THE IMPORTANT PART! #73 скопировал из сайта ReduxForm. Это HOC, которой мы оборачиваем этой контейнерной компонентой, она прокидывает особые пропсы в нашу форму, особый кол-бэк
    form: 'login',                                // a unique name for this form, ЄТО имя никак не связано с словом form в redux-store.jsx, где оно означает название стейта в глобальном нашем общем стейте с которым работает formReduser
    // fields: ['firstName', 'lastName', 'email'] // all the fields in your form
} )( LoginForm );                                    // передаем форму вокруг которой нужно создать эту РедаксФорм

const Login = ( props ) => {
    const onSubmit = ( formData ) => { // в созданну нами ф-цию придут все значения из формы
        props.login( formData.email, formData.password, formData.rememberMe ); // 78 вызываем из пропсов какой то логин, который приходит к нам благодаря connect. Это колл бек - ф-ция, которая внутри себя диспатчик вызов санккриэйтера, который также наз-ся login, но это разные "логины"!
    }

    const navigate = useNavigate(); // 78 заменил сам - Redirect, как показывал Димыч, поставил navigate/useNavigate
    if (props.isAuth) {
        return navigate( '/profile' ) // 78 заменил сам - Redirect, как показывал Димыч, поставил navigate/useNavigate
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/> {/*// рисуем контейнерную компоненту, которую мы получили*/}
    </div>
}

const mapStateToProps = ( state ) => ({
    isAuth: state.auth.isAuth
})

export default connect( mapStateToProps, { login } )( Login ); // 78 ранее экспортировалась просто  Login, а теперь будет экспоритроваться контрейнерная компонента, которая образовалась с помощью HOC connect. Null ставим, т.к. данные отсюда никакие пока нам не нужны. login тут яв-ся санккриэйтером