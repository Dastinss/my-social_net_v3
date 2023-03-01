import React from "react";
import store from "./redux/redux-store";

const StoreContext = React.createContext(null); // создаем компоненту через createContext

export const Provider = (props) => { // инкапсулировали(скрыли детали) 
    return  <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContext;