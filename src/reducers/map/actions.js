import {
    ADD_MARKER,
} from './constants';

export const addMarker = (data) => {
    return {
        type: ADD_MARKER,
        payload: data,
    }
};