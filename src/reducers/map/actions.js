import * as constants from './constants';

export const addMarker = (data) => {
    return {
        type: constants.ADD_MARKER,
        payload: data,
    }
};

export const mapMovement = (data) => {
    return {
        type: constants.MAP_MOVEMENT,
        payload: data,
    }
};