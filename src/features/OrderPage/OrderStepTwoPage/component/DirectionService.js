/* eslint-disable no-undef */
import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { DirectionsService } from "@react-google-maps/api";
import { getDirection } from "context/routing/action";

const DirectionService = props => {
    /* Destructuring some props from Map component */
    const { origin, destination, travelMode, dispatch } = props;

    /**
     * Directions Service Callback receive two parameter from google maps api. Which is
     * result and status. This function used for checking if calling google maps api is
     * resolved and then set the direction's value to the result from google maps api.
     */
    const directionsServiceCallback = useCallback(
        (result, status) => {
            console.log("direction callback");
            if (status === google.maps.DirectionsStatus.OK) {
                console.log("direction = ", result);
                getDirection(result, dispatch);
            } else {
                console.log("error occured in direction service");
            }
        },
        [dispatch]
    );

    /**
     * Directions service render function which will create a request and calling google maps api
     * and set the callback function for resolving the response.
     */
    const render = useMemo(() => {
        /* check if no both origin and destination */
        if (destination !== null && origin !== null) {
            return (
                <DirectionsService
                    options={{
                        origin: origin.geometry.location,
                        destination: destination.geometry.location,
                        travelMode: travelMode
                    }}
                    callback={directionsServiceCallback}
                />
            );
        } else {
            return null;
        }
    }, [destination, directionsServiceCallback, origin, travelMode]);

    return render;
};

DirectionService.propTypes = {
    origin: PropTypes.object,
    destination: PropTypes.object,
    travelMode: PropTypes.string
};

export default DirectionService;
