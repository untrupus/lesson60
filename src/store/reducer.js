import {
    FETCH_MESSAGES_ERROR,
    FETCH_MESSAGES_SUCCESS,
    POST_MESSAGE_ERROR,
    POST_MESSAGE_SUCCESS
} from "./actionTypes";

const initialState = {
    messenger: [],
    error: {},
    getError: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_SUCCESS:
            console.log(action.value);
            return {...state, messenger: action.value, error: {}}
        case FETCH_MESSAGES_ERROR:
            return {...state, getError: action.error}
        case POST_MESSAGE_SUCCESS:
            return state;
        case POST_MESSAGE_ERROR:
            return {...state, error: action.error}
        default:
            return state;
    }
};

export default reducer;