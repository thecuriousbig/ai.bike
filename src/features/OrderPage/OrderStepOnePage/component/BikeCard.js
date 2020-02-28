import React from "react";
import styled from "styled-components";
import { fontFamily, fontSize, device, color } from "style/theme";

const Card = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 9fr 1fr;
    grid-template-areas: "image" "text";
    margin: 1rem;
    @media ${device.tablet} {
        width: 45%;
        height: 200px;
    }
    @media ${device.laptop} {
        width: 40%;
        height: 270px;
    }
`;

Card.Image = styled.div`
    grid-area: image;
    background: url(${props => props.image});
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    transition-property: border, transform;
    transition-duration: 0s, 0.25s;
    &:hover {
        transform: scale(1.1);
    }
    ${props => {
        if (props.selected) {
            return `
                transform: scale(1.1);
                border: 3px solid ${color.green1};
            `;
        }
    }}
`;

Card.Text = styled.div`
    grid-area: text;
    font-family: ${fontFamily};
    font-size: ${fontSize.XS}rem;
    color: ${color.black};
    text-align: center;
    border-radius: 0px 0px 20px 20px;
    padding: 0.75rem 0;
`;

const BikeCard = props => {
    const { image, text, handleClick, selected, id } = props;

    return (
        <Card onClick={() => handleClick(id, text)}>
            <Card.Image image={image} selected={selected} />
            <Card.Text>
                <p>{text}</p>
            </Card.Text>
        </Card>
    );
};

export default BikeCard;
