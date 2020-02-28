import {
    GET_BIKE,
    GET_ORIGIN,
    GET_DESTINATION,
    GET_DIRECTION,
    GET_TRAVEL_MODE,
    GET_DISTANCE,
    GET_DURATION,
    GET_MAP_REFERENCE,
    RESET
} from "./type";

// TODO: define new initial state that suite aws well.
const initialState = {
    bike: "",
    origin: null,
    destination: null,
    direction: null,
    distance: null,
    duration: null,
    travelMode: "DRIVING",
    mapReference: null
};

/* map reducer */
function routeReducers(state = initialState, action) {
    switch (action.type) {
        case GET_BIKE:
            return { ...state, bike: action.payload };
        case GET_ORIGIN:
            return { ...state, origin: action.payload };
        case GET_DESTINATION:
            return { ...state, destination: action.payload };
        case GET_DIRECTION:
            return { ...state, direction: action.payload };
        case GET_DISTANCE:
            return { ...state, distance: action.payload };
        case GET_TRAVEL_MODE:
            return { ...state, travelMode: action.payload };
        case GET_DURATION:
            return { ...state, duration: action.payload };
        case GET_MAP_REFERENCE:
            return { ...state, mapReference: action.payload };
        case RESET:
            return initialState
        default:
            throw new Error(
                `action type:${action.type} and payload: ${action.payload} does not exist.`
            );
    }
}

export default routeReducers;
export { initialState };
