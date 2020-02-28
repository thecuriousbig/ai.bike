import React from "react";
import styled from "styled-components";
import { fontSize, color } from "style/theme";

const Container = styled.div`
    width: 100%;
    overflow: hidden;
`;

const List = styled.ul`
    counter-reset: step;
    padding-left: 0;
`;

const Item = styled.li`
    list-style-type: none;
    float: left;
    width: 33.33%;
    font-size: calc(${fontSize.XS}rem - 0.25rem); /* 0.75rem */
    position: relative;
    text-align: center;
    color: ${color.grey0};
    ${props => {
        if (props.active) {
            return `
                color: ${color.black};
            `;
        }
    }}
    /* box */
    &::before {
        content: counter(step);
        counter-increment: step;
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        font-size: calc(${fontSize.XS}rem + 0.125rem);
        line-height: 2.5rem;
        text-align: center;
        margin: 0 auto 10px auto;
        border-radius: 50%;
        background-color: ${color.grey0};
        color: ${color.white};
        ${props => {
            if (props.active) {
                return `
                    background: linear-gradient(
                        180deg,
                        ${color.green1} 0%,
                        ${color.green2} 100%
                    );
                `;
            }
        }}
    }
    /* dashed line */
    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        border: none;
        border-top: 3px dashed ${color.grey0};
        top: 1.25rem;
        left: -50%;
        z-index: -1;
        ${props => {
            if (props.active) {
                return `border-top: 3px dashed ${color.green2};`;
            }
        }}
    }
    &:first-child::after {
        content: none;
    }
`;

function ProgressBar(props) {
    const { currentStep, className } = props;

    const list = [
        { id: 1, text: "เลือกจักรยาน" },
        { id: 2, text: "ระบุสถานที่" },
        { id: 3, text: "ยืนยัน" }
    ];

    const renderProgressBar = (id, text) => {
        // return true if there is a matched id. Otherwise return false.
        return (id <= currentStep) === true ? (
            <Item key={id} active>
                {text}
            </Item>
        ) : (
            <Item key={id}>{text}</Item>
        );
    };

    return (
        <Container className={className}>
            <List>
                {list.map(item => renderProgressBar(item.id, item.text))}
            </List>
        </Container>
    );
}

export default ProgressBar;
