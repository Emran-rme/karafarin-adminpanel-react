export const footerReducer = (state= {}, action) => {
    switch (action.type) {
        case "INIT_FOOTER_DATA":
            return {...action.payload}
        case "SET_FOOTER_DATA":
            return {...action.payload}
        default:
            return state;
    }
}