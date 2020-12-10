import {
    ADD_MARKER,
} from './constants';

const initialState = {
    geoData : {
        payload: [],
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MARKER:
            return  { ...state, geoData: { payload : action.payload }};
        default:
        {
            return state
        }
    }
}
