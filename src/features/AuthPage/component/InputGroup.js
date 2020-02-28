import React from "react";
import styled from "styled-components";
import { fontFamily, fontSize, color } from "style/theme";

const StyledInputGroup = styled.div`
    padding: 1rem 0;
`;

StyledInputGroup.Label = styled.p`
    width: calc(100% - 20px);
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem - 0.125rem); /* 0.875rem */
    color: ${color.white};
    padding-left: 20px;
`;

StyledInputGroup.Input = styled.input`
    width: calc(100% - 20px);
    height: 2rem;
    padding-left: 20px;
    font-size: ${fontSize.XS}rem;
    font-family: ${fontFamily};
    color: ${color.white};
    border: none;
    border-radius: 20px;
    background: ${color.grey4};
    opacity: 100%;
    &:focus {
        outline: none;
    }
`;

function InputGroup (props) {
    const {className, placeholder, label, ...prop} = props
    return (
        <StyledInputGroup className={className}>
            <StyledInputGroup.Label>{label}</StyledInputGroup.Label>
            <StyledInputGroup.Input placeholder={placeholder} {...prop} />
        </StyledInputGroup>
    );
}

export default InputGroup;