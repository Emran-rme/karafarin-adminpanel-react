export const adminMainReducers = (state = {}, action) => {
    switch (action.type) {
        case "INIT_ALL_DATA":
            return {...action.payload};
        default:
            return state;
    }
}