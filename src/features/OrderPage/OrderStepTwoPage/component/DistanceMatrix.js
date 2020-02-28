/* eslint-disable no-undef */
import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { DistanceMatrixService } from "@react-google-maps/api";
import { getDistance, getDuration } from "context/routing/action";

const DistanceMatrix = props => {
    const { origin, destination, direction, travelMode, dispatch } = props;

    const distanceMatrixCallback = useCallback(
        (result, status) => {
            console.log("distance result : ", result);
            if (status === google.maps.DistanceMatrixStatus.OK) {
                const matrix = result.rows[0].elements[0];
                console.log("matrix :", matrix);
                if (
                    matrix.status === google.maps.DistanceMatrixElementStatus.OK
                ) {
                    getDistance(matrix.distance, dispatch);
                    getDuration(matrix.duration, dispatch);
                } else {
                    console.error(
                        `DistanceMatrixElementStatus is ${matrix.status}`
                    );
                }
            } else {
                console.error(`DistanceMatrixStatus is ${status}`);
            }
        },
        [dispatch]
    );

    const render = useMemo(() => {
        if (direction !== null) {
            return (
                <DistanceMatrixService
                    options={{
                        origins: [origin.geometry.location],
                        destinations: [destination.geometry.location],
                        travelMode: travelMode,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        drivingOptions: {
                            departureTime: new Date(Date.now()),
                            trafficModel: "pessimistic"
                        }
                    }}
                    callback={distanceMatrixCallback}
                />
            );
        } else {
            return null;
        }
    }, [destination, direction, distanceMatrixCallback, origin, travelMode]);

    return render;
};

DistanceMatrix.propTypes = {
    origin: PropTypes.object,
    destination: PropTypes.object,
    direction: PropTypes.object,
    travelMode: PropTypes.string
};

export default DistanceMatrix;
