import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Svg = styled.svg``;

const MapPin = props => {
    const { className, color, size, ...otherProps } = props;
    return (
        <Svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...otherProps}
        >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </Svg>
    );
};

MapPin.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

MapPin.defaultProps = {
    color: "currentColor",
    size: "24"
};

export default MapPin;
