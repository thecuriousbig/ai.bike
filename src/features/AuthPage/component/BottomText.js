import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { color, fontSize } from "style/theme";

const Span = styled.span`
    color: ${color.white};
    font-size: calc(${fontSize.XS}rem - 0.25rem);
`;

const Anchor = styled(Link)`
    color: ${color.green1};
    &:hover {
        cursor: pointer;
    }
`;

function BottomText(props) {
    const { text, aText, path } = props;
    return (
        <Span>
            {text}<Anchor to={path}>{aText}</Anchor>
        </Span>
    );
}

export default BottomText;
