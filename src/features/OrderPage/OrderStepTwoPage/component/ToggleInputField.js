import React, { useRef } from "react";
import styled from "styled-components";
import DestinationList from "./DestinationList";
import { device, color, fontSize, fontFamily } from "style/theme";

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7); /* black color with opacity 0.7 */
    position: absolute;
    top: 0;
    display: ${props => (props.toggle ? "flex" : "none")};
    @media ${device.tablet} {
        ${props => {
            if (props.toggle) {
                return `
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `;
            } else return `display: none;`;
        }}
    }
`;

const Modal = styled.div`
    width: 100%;
    height: 50%;
    position: absolute;
    background-color: ${color.white};
    border-radius: 20px 20px 0 0;
    bottom: 0;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
    @media ${device.tablet} {
        width: 40%;
        height: 30%;
        border-radius: 20px;
        position: initial;
    }
`;

const Header = styled.span`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem + 0.25rem);
    text-align: center;
    padding: 1rem 0 1rem 0;
`;

const ToggleInputField = props => {
    const { toggle, handleOutsideClick, handleChoiceClick } = props;
    const ref = useRef(null);
    return (
        <Background
            onClick={e => handleOutsideClick(ref, e)}
            toggle={toggle}
            ref={ref}
        >
            <Modal>
                <Header>เลือกสถานที่ปลายทาง</Header>
                <DestinationList handleClick={handleChoiceClick} />
            </Modal>
        </Background>
    );
};

export default ToggleInputField;
