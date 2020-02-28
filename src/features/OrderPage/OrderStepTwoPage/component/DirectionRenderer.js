/* eslint-disable no-undef */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { DirectionsRenderer } from "@react-google-maps/api";

const DirectionRenderer = props => {
    const { direction } = props;

    return useMemo(() => {
        if (!direction) return null;
        else return <DirectionsRenderer directions={direction} />;
    }, [direction]);
};

DirectionRenderer.propTypes = {
    direction: PropTypes.object
};

export default DirectionRenderer;
