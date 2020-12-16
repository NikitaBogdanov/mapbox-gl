import * as constants from './constants';

const initialState = {
    mapSettings: {
        lng: -77.020945,
        lat: 38.878241,
        zoom: 17,
    },
    geoData: {
        payload: [],
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case constants.ADD_MARKER:
            return  {...state, geoData: {payload: action.payload}};
        case constants.MAP_MOVEMENT:
            return {...state, mapSettings: action.payload};
        default:
            return state;
    }
}
