/* eslint-disable no-undef */
import {
    GET_BIKE,
    GET_ORIGIN,
    GET_DESTINATION,
    GET_DIRECTION,
    GET_DISTANCE,
    GET_TRAVEL_MODE,
    GET_DURATION,
    GET_MAP_REFERENCE,
    RESET
} from "./type";

const getBike = (bike, dispatch) => {
    dispatch({type: GET_BIKE, payload: bike});
}

/**
 * Used for get the informations such as name, place_id, location, place's type of the origin.
 * @param {number} placeId - Specific ID used for indicate the place.
 * @param {*} map - Map instance.
 * @param {*} dispatch - Dispatch function used for dispatch an action to the context provider.
 */
const getOrigin = async (placeId, map, dispatch) => {
    /* create request that have place_id and fields (response will returns an informations that represents in fields). */
    const request = {
        placeId: placeId,
        fields: ["name", "place_id", "formatted_address", "geometry", "types"]
    };
    const service = new google.maps.places.PlacesService(map);
    /* getDetails function provided by google maps api which returns an informations of places in the callbacks function. */
    return await service.getDetails(request, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // const origin = {
            //     name: place.name,
            //     place_id: place.place_id,
            //     location: place.geometry.location,
            //     types: place.types
            // };
            console.log("origin = ", place);
            /* dispatch an action which have 2 parameters (type and payload). */
            dispatch({ type: GET_ORIGIN, payload: place });
        } else {
            console.error(`ERROR: getOrigin's response status: ${status}`);
        }
    })
}

/**
 * Used for get the informations of the destination.
 * @param {number} placeId - Specific number that indicate the place.
 * @param {*} map - Map instance.
 * @param {*} dispatch - Dispatch function that used for dispatch the action to the context provider.
 */
const getDestination = async (placeId, map, dispatch) => {
    /* create a request for google maps api */
    const request = {
        placeId: placeId,
        fields: ["name", "place_id", "formatted_address", "geometry", "types"]
    };
    const service = new google.maps.places.PlacesService(map);
    return await service.getDetails(request, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // const destination = {
            //     name: place.name,
            //     place_id: place.place_id,
            //     formatted_address: place.formatted_address,
            //     location: place.geometry.location,
            //     types: place.types
            // };
            console.log("destination = ", place);
            /* Dispatch an action that have type of action and payload as a parameter */
            dispatch({ type: GET_DESTINATION, payload: place });
        } else {
            console.error(`ERROR: getDestination's response status: ${status}`);
        }
    });
}

/**
 * Used for get the direction from google maps api
 * @param {*} direction direction object
 * @param {*} dispatch dispatch function
 */
const getDirection = (direction, dispatch) => {
    return dispatch({ type: GET_DIRECTION, payload: direction });
}

/**
 * Used for get the distance from google maps api
 * @param {*} distance distance object
 * @param {*} dispatch dispatch function
 */
const getDistance = (distance, dispatch) => {
    return dispatch({ type: GET_DISTANCE, payload: distance });
}

/**
 * Used for get the google maps travelMode
 * @param {String} travelMode String that describe a mode of traveling
 * @param {*} dispatch dispatch function
 */
const getTravelMode = (travelMode, dispatch) => {
    return dispatch({ type: GET_TRAVEL_MODE, payload: travelMode });
}

/**
 * Used for get the duration from google maps api
 * @param {*} duration duration object
 * @param {*} dispatch dispatch function
 */
const getDuration = (duration, dispatch) => {
    return dispatch({ type: GET_DURATION, payload: duration });
}

/**
 * Used for get the google map object reference for further use
 * @param {*} map map reference object
 * @param {*} dispatch dispatch function
 */
const getMapReference = (map, dispatch) => {
    return dispatch({ type: GET_MAP_REFERENCE, payload: map });
}

const reset = (dispatch) => {
    return dispatch({type: RESET})
}

export {
    getBike,
    getOrigin,
    getDestination,
    getDirection,
    getDistance,
    getTravelMode,
    getDuration,
    getMapReference,
    reset
};
