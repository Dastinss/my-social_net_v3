import React from 'react';
import styles from './FormsControls.module.css'
import { Field } from "redux-form";
import { required } from "../../../utils/validators/validators";

export const FormControl = ( { input, meta: {touched, error}, children} ) => { // #90 делаем деструктуризацию параметров - вместо "общerо" meta указали внутреннюю деструктуризацию, НИже, соответственно, вместо meta.touched && meta.error поставили просто touched и error
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {children}{/*вводим понятие чайлд для того, чтобы зарефакторить два куска кода ниже, которые идентичны*/}
                {/*<textarea {...input} {...props}/> /!*создаем обертку над элементом, как в др метсах создавали над компонентой - все пропсы приходящие в нас должны отдать конечному потребителю*!/*/}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps } = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
};

export const Input = (props) => {
   const {input, meta, child, ...restProps } = props;
   return <FormControl {...props}> <input {...input} {...restProps}/> </FormControl>
};

export const createField = (placeholder, name, validators, component, props = {}, text = '') => ( // #90 ф-ции хэлпера убираем дублирование кода в компоненте Login
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
               /> {text} {/*#75 добавил имя name={УКАЗЫВАЕМ свойство} для отправки на сервер имени данного элемента куда мы вводим данные §77 добавили валидацию - ф-цию Input, validate={[required]}*/}
        {/*<input placeholder={'Login'}/> // #75 заменили на Field (по сути контейнерная компонента. которая рисует др компоненту) из билиотеки reduxForm*/}
    </div>
)


//зарефакторили выше - для уменьшения строк кода
// export const Textarea = ( { input, meta, ...props } ) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
//             <div>
//                 <textarea {...input} {...props}/> {/*создаем обертку над элементом, как в др метсах создавали над компонентой - все пропсы приходящие в нас должны отдать конечному потребителю*/}
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// };
//
// export const Input = ( { input, meta, ...props } ) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
//             <div>
//                 <input {...input} {...props}/> {/*создаем обертку над элементом, как в др метсах создавали над компонентой - все пропсы приходящие в нас должны отдать конечному потребителю*/}
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// };
