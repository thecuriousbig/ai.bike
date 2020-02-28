import React from "react";
import styled from "styled-components"
import { fontFamily, fontSize, color } from "style/theme"

const StyledButton = styled.button`
    height: 2rem;
    width: 10rem;
    border: none;
    border-radius: 20px;
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem - 0.125rem);
    color: ${color.white};
    background: linear-gradient(${color.green1}, ${color.green2});
    cursor: pointer;
`;

function Button (props) {
    const { text, ...prop } = props
    return <StyledButton {...prop}>{text}</StyledButton>
}

export default Button;