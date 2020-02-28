import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Container from "../component/Container";
import ContentContainer from "../component/ContentContainer";
import HeadBar from "shared/HeadBar";
import ProgressBar from "shared/ProgressBar";
import Map from "./component/Map";
import MapPanel from "./component/MapPanel";
import Footer from "shared/Footer";
import { api } from "api/map";
import { fontSize, fontFamily, color } from "style/theme";
import { useRouteStateContext, useRouteDispatchContext } from "context/routing";
import { reset } from "context/routing/action";

const StyledProgressBar = styled(ProgressBar)`
    padding: 1rem 0;
`;

const Title = styled.p`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem + 0.25rem);
    color: ${color.black};
    padding-left: 1rem;
`;

const OrderStepTwoPage = props => {
    const routeState = useRouteStateContext();
    const routeDispatch = useRouteDispatchContext();
    const history = useHistory();
    const {
        origin,
        destination,
        direction,
        duration,
        travelMode,
        mapReference
    } = routeState;

    /**
     * Handle the footer previous button clicked event by
     * reset the user's routing value from the context
     * then go back to previous route.
     */
    const handlePrevButton = async () => {
        reset(routeDispatch);
        history.goBack();
    };

    /**
     * Handle the footer next button clicked event by
     * push the user to next route which is /order/step-three.
     */
    const handleNextButton = () => {
        history.push("/order/step-three");
    };

    /**
     * Check if user have already fill the information before going
     * to next route.
     */
    const canGoNext = () => {
        /* Check if there is direction? If yes, can go to next path. */
        console.log("can go next: ", direction !== null);
        if (direction !== null) return true;
        else return false;
    };

    return (
        <Container>
            <HeadBar />
            <ContentContainer>
                <StyledProgressBar currentStep={2} />
                <Title>เลือกสถานที่ปลายทาง</Title>
                <Map
                    api={api}
                    origin={origin}
                    destination={destination}
                    direction={direction}
                    travelMode={travelMode}
                    mapReference={mapReference}
                    dispatch={routeDispatch}
                />
                <MapPanel
                    destination={destination}
                    duration={duration}
                    mapReference={mapReference}
                    dispatch={routeDispatch}
                />
                <Footer
                    next={true}
                    canGoNext={canGoNext()}
                    handlePrev={handlePrevButton}
                    handleNext={handleNextButton}
                />
            </ContentContainer>
        </Container>
    );
};

export default OrderStepTwoPage;
