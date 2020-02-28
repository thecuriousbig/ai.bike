import React from "react";
import styled from "styled-components";
import { fontFamily, fontSize, color, device } from "style/theme";

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
        font-family: ${fontFamily};
        font-size: calc(${fontSize.XS}rem - 0.125rem);
    }
    .inactive {
        color: ${color.grey2};
    }
    @media ${device.tablet} {
        width: 80%;
    }
`;

const SubscribeText = props => {
    const { duration } = props;
    return (
        <Container>
            <span>เวลาที่ใช้โดยประมาณ</span>
            {duration !== null ? (
                <span>{duration.text}</span>
            ) : (
                <span className="inactive">- นาที</span>
            )}
        </Container>
    );
};

export default SubscribeText;
