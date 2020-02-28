import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MapPin from "shared/Icons/MapPin";
import { device, color, fontSize, fontFamily } from "style/theme";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
`;

const Text = styled.span`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem - 0.25rem);
    ${props => {
        if (props.interactive) {
            return `
                color: ${
                    props.haveDestination ? `${color.black}` : `${color.grey2}`
                };
                cursor: pointer;
            `;
        } else {
            return `
                color: ${color.black}
            `;
        }
    }}
`;

const Icon = styled(MapPin)`
    padding-left: 20px;
    padding-right: 30px;
    @media ${device.tablet} {
        padding-left: 40px;
        padding-right: 60px;
    }
`;

const InputField = props => {
    const { interactive, handleClick, destination } = props;
    return (
        <Container>
            <Icon
                size={"24px"}
                color={interactive ? `${color.orange1}` : `${color.green1}`}
            />
            <Text
                interactive={interactive}
                haveDestination={destination !== null}
                onClick={() => handleClick(interactive)}
            >
                {interactive
                    ? destination !== null
                        ? destination.name
                        : `เลือกจุดหมายปลายทาง`
                    : `ตำแหน่งเริ่มต้นของจักรยาน`}
            </Text>
        </Container>
    );
};

InputField.propTypes = {
    interactive: PropTypes.bool,
    handleClick: PropTypes.func,
    destination: PropTypes.object
};

InputField.defaultProps = {
    interactive: false,
    handleClick: () => null,
    destination: null
};

export default InputField;
