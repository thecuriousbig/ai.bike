/* eslint-disable no-undef */
import React, { useCallback } from "react";
import styled from "styled-components";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Spinner from "shared/Icons/Spinner";
import { fontFamily, fontSize, device, color } from "style/theme";
import DirectionService from "./DirectionService";
import DirectionRenderer from "./DirectionRenderer";
import DistanceMatrix from "./DistanceMatrix";
import {
    getOrigin,
    getDestination,
    getMapReference
} from "context/routing/action";

const Container = styled.div`
    width: 100%;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* increase map's height when on larger screen */
    @media ${device.tablet} {
        height: 30rem;
    }
    @media ${device.laptop} {
        height: 25rem;
    }
`;
const Error = styled.h1`
    font-family: ${fontFamily};
    font-size: ${fontSize.XS}rem;
    color: ${color.red1};
    text-align: center;
`;
const StyledSpinner = styled(Spinner)`
    /* Overwritten spinner width and height for responsive design. */
    @media ${device.tablet} {
        height: 10vw;
        width: 10vw;
    }
`;

const mapExtendLibrary = ["places"];

const Map = props => {
    const {
        api,
        origin,
        destination,
        direction,
        travelMode,
        mapReference,
        dispatch
    } = props;

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: api,
        language: "thai",
        preventGoogleFontsLoading: true,
        libraries: mapExtendLibrary
    });

    /**
     * Get the map's origin
     */
    const getMapOrigin = useCallback((id, ref, dispatch) => {
        getOrigin(id, ref, dispatch);
    }, []);

    /**
     * Get the map's destination
     */
    const getMapDestination = useCallback((id, ref, dispatch) => {
        getDestination(id, ref, dispatch);
    }, []);

    const renderMap = () => {
        /**
         * Define the step that need to do after map is successfully loaded such as set the origin, fit map bound, etc.
         * @param {*} mapref - map's instance that reference to current map that display on this component.
         */
        const initMap = async map => {
            /* Save the map reference to use it later on this or other component. */
            // setMap(mapref);
            getMapReference(map, dispatch);
            /* Display origin's marker on map. */
            const originPlaceId = "ChIJF7CaKFKi4jARaTWDHy1-6tE";
            getMapOrigin(originPlaceId, map, dispatch);
        };

        const handleMapClick = async e => {
            console.log(e.latLng.lat(), e.latLng.lng());
            /* Set destination */
            getMapDestination(e.placeId, mapReference, dispatch);
        };

        return (
            <GoogleMap
                onLoad={initMap}
                center={
                    direction === null
                        ? { lat: 13.650287493268046, lng: 100.49371629953384 }
                        : direction.routes[0].bounds.getCenter()
                }
                onClick={handleMapClick}
                zoom={16}
                mapContainerStyle={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <DirectionService
                    origin={origin}
                    destination={destination}
                    travelMode={travelMode}
                    dispatch={dispatch}
                />
                <DirectionRenderer direction={direction} />
                <DistanceMatrix
                    origin={origin}
                    destination={destination}
                    direction={direction}
                    travelMode={travelMode}
                    dispatch={dispatch}
                />
            </GoogleMap>
        );
    };

    if (loadError) {
        return (
            <Container>
                <Error>เกิดข้อผิดพลาดในการแสดงแผนที่</Error>
            </Container>
        );
    }

    return isLoaded ? (
        <Container>{renderMap()}</Container>
    ) : (
        <Container>
            <StyledSpinner
                width={"20vw"}
                height={"20vw"}
                color={`${color.green1}`}
            />
        </Container>
    );
};

export default Map;
