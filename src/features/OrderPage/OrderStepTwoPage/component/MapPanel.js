import React, { useState } from "react";
import styled from "styled-components";
import { device, color } from "style/theme";
import { getDestination } from "context/routing/action";
import ToggleInputField from "./ToggleInputField";
import InputField from "./InputField";
import SubscribeText from "./SubscribeText";

const Container = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`;

const InputFieldContainer = styled.div`
    width: 90%;
    height: 120px;
    background-color: ${color.grey1};
    border-radius: 20px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-evenly;
    @media ${device.tablet} {
        width: 80%;
    }
`;

const MapPanel = props => {
    const [toggleField, setToggleField] = useState(false);
    const { destination, duration, mapReference, dispatch } = props;

    const handleFieldClick = interactive => {
        if (!interactive) return;
        /* open the toggleField */
        console.log("toggle: ", toggleField);
        setToggleField(true);
    };

    const handleOutsideClick = (ref, e) => {
        console.log("e.target", e.target);
        console.log("ref: ", ref.current);
        if (ref.current === e.target) {
            /* close the toggleField */
            setToggleField(false);
        }
    };

    const handleChoiceClick = place => {
        getDestination(place.place_id, mapReference, dispatch);
        /* close the toggle input field */
        setToggleField(false);
    };

    return (
        <Container>
            <InputFieldContainer>
                <InputField interactive={false} />
                <InputField
                    interactive={true}
                    destination={destination}
                    handleClick={handleFieldClick}
                />
            </InputFieldContainer>
            <SubscribeText duration={duration} />
            <ToggleInputField
                toggle={toggleField}
                handleOutsideClick={handleOutsideClick}
                handleChoiceClick={handleChoiceClick}
            />
        </Container>
    );
};

export default MapPanel;
