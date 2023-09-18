
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    // state.users.map( u => {
    return items.map( u => {
        // if (u.id === action.userId) { // заменили .id на [objPropName] и action.userId на itemId
        if (u[objPropName] === itemId) {
            // return { ...u, followed: true } // если ID совпадает, то возвращаем копию обекта, если не совпадает - то возвращаем сам обїект
            return { ...u, ...newObjProps} // заменили через диструктуризацию followed: true (все свойства )на newObjProps
        }
        return u;
    } )
}