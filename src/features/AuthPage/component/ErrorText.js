import React from "react";
import styled from "styled-components";
import { fontFamily, fontSize, color } from "style/theme" 
const StyledErrorText = styled.p`
    width: 100%;
    text-align: center;
    font-size: calc(${fontSize.XS}rem - 0.125rem);
    font-family: ${fontFamily};
    color: ${color.red1};
`;

function ErrorText (props) {
    const { text } = props
    return (
        <StyledErrorText>{text}</StyledErrorText>
    )
}

export default ErrorText;