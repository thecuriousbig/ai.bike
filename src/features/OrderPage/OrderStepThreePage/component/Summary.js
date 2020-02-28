import React from "react";
import styled from "styled-components";
import { device, color, fontFamily, fontSize } from "style/theme";
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
`;

const Block = styled.div`
    height: 50px;
    width: ${props => (props.tworows ? "45%" : "80%")};
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

const Topic = styled.span`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem - 0.125rem);
    color: ${color.black};
    float: left;
    /* padding-left: 1rem; */
`;

const Text = styled.span`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem - 0.125rem);
    color: ${color.grey2};
    float: right;
    /* padding-right: 0.25rem; */
`;

const Summary = props => {
    const { bike, destination, duration, distance } = props;
    return (
        <Container>
            <Block>
                <Topic>จุดหมาย</Topic>
                <Text>{destination.name}</Text>
            </Block>
            <Block>
                <Block tworows>
                    <Topic>ระยะเวลา</Topic>
                    <Text>{duration.text}</Text>
                </Block>
                <Block tworows>
                    <Topic>ระยะทาง</Topic>
                    <Text>{distance.text}</Text>
                </Block>
            </Block>
            <Block>
                <Topic>ประเภทของจักรยาน</Topic>
                <Text>{bike}</Text>
            </Block>
        </Container>
    );
};

export default Summary;
