import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import { userAPI } from "../../../api/api";

//# 84 переделали классовую компоненту в функциональную используя HOOKS для того чтобы идти в ногу со временем )
const ProfileStatusWithHooks = (props) => { //84 это функцилнальная компонента, которая создали из такой же классовой ProfileStatus.jsx
    const [editMode, setEditMode] = useState( true ); // 84 возвращаем массив в котором первым эллементом сидит значение ,вторым - ф-ция которая это значение устанавливает

    return (
            <div>
                { !editMode &&
                    <div>
                        <span>{props.status || '========= '}</span> {/* поставили БЕЗ bind , т.к. стоит стрелочная ф-ция fn=()=>*. status показіваем ИЗ пропсов, т.к. сервер не обновился */}
                    </div>
                }
                { editMode &&
                    <div>
                        <input autoFocus={true}/> {/* поставили С bind , т.к. стоит определяющая  ф-ция (fn()  ), status показіваем не из пропсов, а из локального стейта */}
                    </div>
                }
            </div>
        )
    }

export default ProfileStatusWithHooks;