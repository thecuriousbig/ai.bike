import React from "react";
import styled from "styled-components";
import { device, color } from "style/theme";

const StyledContentContainer = styled.div`
    width: 100%;
    height: 100%;
    @media ${device.tablet} {
        width: 60%;
        margin: 0 auto;
        /* border-left: 1px solid ${color.grey0};
        border-right: 1px solid ${color.grey0};
        border-bottom: 1px solid ${color.grey0}; */
    }
    @media ${device.laptop} {
        width: 50%;
        margin: 0 auto;
        /* border-left: 1px solid ${color.grey0};
        border-right: 1px solid ${color.grey0};
        border-bottom: 1px solid ${color.grey0}; */
    }
`;

const ContentContainer = (props) => {
    return (
        <StyledContentContainer className={props.className}>
            {props.children}
        </StyledContentContainer>
    )
}

export default ContentContainer;