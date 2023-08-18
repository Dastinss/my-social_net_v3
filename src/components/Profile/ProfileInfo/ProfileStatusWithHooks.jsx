import React, { useEffect, useState } from 'react';
import s from './ProfileInfo.module.css';
import { userAPI } from "../../../api/api";

//# 84 переделали классовую компоненту в функциональную используя HOOKS для того чтобы идти в ногу со временем )
const ProfileStatusWithHooks = ( props ) => { //84 это функцилнальная компонента, которая создали из такой же классовой ProfileStatus.jsx

    const [editMode, setEditMode] = useState( false ); // 84 возвращаем массив в котором первым эллементом сидит значение ,вторым - ф-ция которая это значение устанавливает
    const [status, setStatus] = useState( props.status ); // 84 возвращаем массив в котором первым эллементом сидит значение (в єтом хуке инициализационное значение берем из пропсов, а далее значение будет то, которое мы будем сетать) ,вторым - ф-ция которая это значение устанавливает

    useEffect( () => {  // 85 хук, который вызывает какой-то эффект, после того, как все отрисуется и покажется на экране
        setStatus( props.status );
    }, [props.status] ); // показали зависимость [props.status], иначе бы useEffect выполнялся бы после каждой отрисовки. Т.е. этот хук вызывается только когда снаружи к нам придет другой статус, чтобы мы могли его засинхронизировать

    const activateEditMode = () => {
        setEditMode( true )
    }

    const deactivateEditMode = () => {
        setEditMode( false )
        props.updateStatus( status )// отправляем запрос на сервер с просьбой обновить статус
    }

    const onStatusChange = ( e ) => {
        setStatus( e.currentTarget.value )
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span
                        onDoubleClick={activateEditMode}>{props.status || '========= '}</span> {/* поставили БЕЗ bind , т.к. стоит стрелочная ф-ция fn=()=>*. status показіваем ИЗ пропсов, т.к. сервер не обновился */}
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                           value={status}/> {/* поставили С bind , т.к. стоит определяющая  ф-ция (fn()  ), status показіваем не из пропсов, а из локального стейта */}
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;