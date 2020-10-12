import {
    FETCH_MESSAGES_ERROR,
    FETCH_MESSAGES_SUCCESS,
    POST_MESSAGE_ERROR,
    POST_MESSAGE_SUCCESS
} from "./actionTypes";
import axiosOrder from "../axiosOrder";

const fetchMessagesSuccess = value => {
    return {type: FETCH_MESSAGES_SUCCESS, value};
};

const fetchMessagesError = error => {
    return {type: FETCH_MESSAGES_ERROR, error};
};
const postMessageSuccess = () => {
    return {type: POST_MESSAGE_SUCCESS};
};
const postMessagesError = error => {
    return {type: POST_MESSAGE_ERROR, error};
};

export const getMessages = () => {
    return async dispatch => {
        try {
            const response = await axiosOrder();
            dispatch(fetchMessagesSuccess(response.data));
        } catch (e) {
            dispatch(fetchMessagesError(e))
        }
    };
};

export const postMessage = (data) => {
    return async dispatch => {
        try {
            await axiosOrder.post('', data);
            dispatch(postMessageSuccess());
        } catch (e) {
            console.log(e.response.data);
            dispatch(postMessagesError(e));
        }
    };
};

export const startInterval = (messenger) => {
    return async dispatch => {
        let lastDate = messenger[messenger.length - 1].datetime;
        let newResponse = await axiosOrder(`?datetime=${lastDate}`);
        const newMessages = newResponse.data;

        if (newMessages.length > 0) {
            let newMessenger = [...messenger];
            for (let i = 0; i < newMessages.length; i++) {
                newMessenger.push(newMessages[i]);
            }
            // console.log(newMessenger);
            // lastDate = messenger[messenger.length - 1].datetime;
            dispatch(fetchMessagesSuccess(newMessenger));
        }

    }
};

