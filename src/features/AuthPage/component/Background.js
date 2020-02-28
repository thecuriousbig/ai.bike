import React from "react";
import styled from "styled-components";
import bg from "assets/images/background.jpg";

const StyledBackground = styled.div`
    height: 100vh;
    background: url(${bg}) 60%;
    background-size: cover;
`;

function Background (props) {
    const {className, children} = props
    return <StyledBackground className={className}>{children}</StyledBackground>;
}

export default Background;