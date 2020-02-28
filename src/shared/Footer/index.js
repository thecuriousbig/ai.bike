import React from "react";
import styled from "styled-components";
import { color, fontSize, fontFamily } from "style/theme";
const Container = styled.div`
    width: 100%;
`;

const Button = styled.button`
    float: ${props => (props.next ? "right" : "left")};
    line-height: 40px;
    width: 100px;
    background: ${props => {
        if (props.next) {
            if (props.canGoNext) {
                return `
                    linear-gradient(180deg,
                        ${color.green1} 0%,
                        ${color.green2} 100%
                    );
                `;
            } else {
                return `${color.grey0}`;
            }
        } else {
            return `${color.grey0}`;
        }
    }};
    color: ${color.white};
    font-size: ${fontSize.XS}rem;
    font-family: ${fontFamily};
    border: none;
    border-radius: 20px;
    margin: 1rem;
`;

const Footer = props => {
    const { next, canGoNext, handleNext, handlePrev } = props;

    return (
        <Container>
            <Button onClick={handlePrev}>ย้อนกลับ</Button>
            {next && (
                <Button
                    next
                    onClick={handleNext}
                    canGoNext={canGoNext}
                    disabled={!canGoNext}
                >
                    ถัดไป
                </Button>
            )}
        </Container>
    );
};

export default Footer;
