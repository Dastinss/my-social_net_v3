import React from 'react';
import s from './ProfileInfo.module.css';

//# 71 изучаем локальный стейт
class ProfileStatus extends React.Component { // это классовая компонента, которая нужна чтобы создавать одинаковые обьекты
    state = { // у нашей класс.компоненты есть локальный стейт
        editMode: false // в стейте хранится изначаоьно НЕ режим редактирования к которому в дальнейшем мы можем обращаться как к пропсам
    }

    activateEditMode = () => {// в класс.компоненте создаем метод, вместо ф-ции-обработчика в функц.компоненте
        this.setState( { // в данный метод setState (ассинхронный!!!) мы пердаем обьект св-ва которого перезапишут св-ва которые были в локальном state
            editMode : true
        } );
    }

    deactivateEditMode () { // обратный метод, который "переключает назад" режим правок, можно исп-ть еще toggle в даном случае
        this.setState( {
            editMode : false
        } );
    }
    render() {

        return (
            <div>
                {!this.state.editMode && //если у нас editMode НЕ тру, то мы отобразим ОДНУ дивку
                    <div>
                        <span onDoubleClick={ this.activateEditMode }>{this.props.status}</span> {/* поставили БЕЗ bind , т.к. стоит стрелочная ф-ция fn=()=>*/}
                    </div>
                }
                {this.state.editMode && //если у нас editMode тру, то мы отобразим ДРУГУЮ дивку
                    <div>
                        <input autoFocus={true} onBlur={ this.deactivateEditMode.bind(this) } value={this.props.status}/> {/* поставили С bind , т.к. стоит определяющая  ф-ция (fn()  ) */}
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;