import React from 'react';
import s from './ProfileInfo.module.css';
import { userAPI } from "../../../api/api";

//# 71 изучаем локальный стейт
class ProfileStatus extends React.Component { // это классовая компонента, которая нужна чтобы создавать одинаковые обьекты
    state = { // у нашей класс.компоненты есть локальный стейт
        editMode: false, // в стейте хранится изначаоьно НЕ режим редактирования к которому в дальнейшем мы можем обращаться как к пропсам
        status: this.props.status// 73 локальный стейт возьмет свое значение изначально из приходящих пропсов и отобразит на страничке
    }

    activateEditMode = () => {// в класс.компоненте создаем метод, вместо ф-ции-обработчика в функц.компоненте
        this.setState( { // в данный метод setState (ассинхронный!!!) мы пердаем обьект св-ва которого перезапишут св-ва которые были в локальном state
            editMode: true
        } );
    }

    deactivateEditMode = () => { // обратный метод, который "переключает назад" режим правок, можно исп-ть еще toggle в даном случае
        this.setState( {
            editMode: false
        } );
        this.props.updateStatus( this.state.status )// отправляем запрос на сервер с просьбой обновить статус
    }

    onStatusChange = ( e ) => { // 73 создаем обработчик метод
        this.setState( { // т.к локальный стейт состоит из нескольких свойств, мы меняем только св-во status, а его значением новым станет e.currentTarget.value -новое значение ;
            status: e.currentTarget.value
        } );
    }

    componentDidUpdate( prevProps, prevState) { // #74 обновление компоненты всегда вызывается при каждом новом рендере
        if (prevProps.status !== this.props.status) { // обязательно ставим условие. сверяем старые пропсы в локальном стейте с новыми пропсами из глобального
            this.setState( { // Если пропсы различаются, то с помощью setState изменяем пустой статус в пропсах локального стейта на новый статус, который пришел в новых пропсах
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode && //если у нас editMode НЕ тру, то мы отобразим ОДНУ дивку
                    <div>
                        <span
                            onDoubleClick={this.activateEditMode}>{this.props.status || '========='}</span> {/* поставили БЕЗ bind , т.к. стоит стрелочная ф-ция fn=()=>*. status показіваем ИЗ пропсов, т.к. сервер не обновился */}
                    </div>
                }
                {this.state.editMode && //если у нас editMode тру, то мы отобразим ДРУГУЮ дивку
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                               value={this.state.status}/> {/* поставили С bind , т.к. стоит определяющая  ф-ция (fn()  ), status показіваем не из пропсов, а из локального стейта */}
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;