import React from "react";
import styled from "styled-components";
import { color, fontSize, fontFamily } from "style/theme";

const StyledHeaderText = styled.p`
    width: 100%;
    color: ${color.white};
    font-size: calc(${fontSize.XS}rem + 0.5rem); /* 1.5rem */
    font-family: ${fontFamily};
    font-weight: 700;
    text-align: center;
`;

function HeaderText(props) {
    const { className, text } = props;
    return <StyledHeaderText className={className}>{text}</StyledHeaderText>;
}

export default HeaderText;
