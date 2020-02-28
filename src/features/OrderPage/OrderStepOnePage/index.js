import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Container from "../component/Container";
import ContentContainer from "../component/ContentContainer";
import HeadBar from "shared/HeadBar";
import ProgressBar from "shared/ProgressBar";
import BikeSelection from "./component/BikeSelection";
import Footer from "shared/Footer";
import { useRouteDispatchContext } from "context/routing";
import { getBike } from "context/routing/action";

const StyledProgressBar = styled(ProgressBar)`
    padding: 1rem 0;
`;

function OrderStepOnePage(props) {
    const history = useHistory();
    const routeDispatch = useRouteDispatchContext();
    const [bikeType, setBikeType] = useState("");

    /**
     * Function that check if user can go to the next step.
     */
    const canGoNext = () => {
        console.log("can go next: ", bikeType !== "");
        /* Check if user already pick a bike then can go to next step. */
        if (bikeType !== "") return true;
        else return false;
    };

    /**
     * Handle next button clicked event which will save a state and go to step 2.
     * @param {*} e
     */
    const handleNext = e => {
        getBike(bikeType, routeDispatch);
        history.push("/order/step-two");
    };

    /**
     * Handle prev button clicked event which will clear a state and go back to homepage.
     * @param {*} e
     */
    const handlePrev = e => {
        getBike("", routeDispatch);
        history.push("/");
    };

    return (
        <Container>
            <HeadBar />
            <ContentContainer>
                <StyledProgressBar currentStep={1} />
                <BikeSelection selectBike={setBikeType} />
                <Footer
                    next={true}
                    canGoNext={canGoNext()}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />
            </ContentContainer>
        </Container>
    );
}

export default OrderStepOnePage;
