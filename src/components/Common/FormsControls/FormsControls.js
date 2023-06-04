import React from 'react';
import styles from './FormsControls.module.css'

export const FormControl = ( { input, meta, child, ...props } ) => {
    const hasError = meta.touched && meta.error; 
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {props.children}{/*вводим понятие чайлд для того, чтобы зарефакторить два куска кода ниже, которые идентичны*/}
                {/*<textarea {...input} {...props}/> /!*создаем обертку над элементом, как в др метсах создавали над компонентой - все пропсы приходящие в нас должны отдать конечному потребителю*!/*/}
            </div>
            {hasError && <span>{meta.error}</span>}
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
