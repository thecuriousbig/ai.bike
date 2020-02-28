import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
`

function Container (props) {
    return (
        <StyledContainer className={props.className}>
            {props.children}
        </StyledContainer>
    )
}

export default Container