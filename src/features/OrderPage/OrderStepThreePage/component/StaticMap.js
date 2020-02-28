import React from "react";
import styled from "styled-components";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { device } from "style/theme";

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

const StaticMap = props => {
    const { direction } = props;

    const renderStaticMap = () => {
        return (
            <Container>
                <GoogleMap
                    zoom={16}
                    mapContainerStyle={{
                        width: "100%",
                        height: "100%"
                    }}
                    options={{
                        zoomControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        gestureHandling: "none"
                    }}
                >
                    <DirectionsRenderer directions={direction} />
                </GoogleMap>
            </Container>
        );
    };

    return renderStaticMap();
};

export default StaticMap;
