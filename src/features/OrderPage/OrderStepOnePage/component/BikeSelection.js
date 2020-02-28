import React, { useState } from "react";
import styled from "styled-components";
import BikeCard from "./BikeCard";
import moutainbike from "assets/images/mountain-bike.jpg";
import roadbike from "assets/images/road-bike.jpg";
import allroadbike from "assets/images/allroad-bike.jpg";
import utilitybike from "assets/images/utility-bike.jpg";
import { color, fontFamily, fontSize } from "style/theme";

const BikeSelectionContainer = styled.div`
    width: 100%;
    height: max-content;
`;

const Header = styled.p`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem + 0.25rem);
    color: ${color.black};
    padding-left: 1rem;
`;

const CardContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin: 1rem 0.25rem;
`;

const BikeSelection = props => {
    const { selectBike } = props;
    const [selected, setSelected] = useState();

    const list = [
        { id: 1, text: "Utility Bike", image: utilitybike },
        { id: 2, text: "Road Bike", image: roadbike },
        { id: 3, text: "Mountain Bike", image: moutainbike },
        { id: 4, text: "All Road Bike", image: allroadbike }
    ];

    const handleCardClick = (id, text) => {
        /* select bike and set user bike state */
        setSelected(id);
        selectBike(text);
    };

    return (
        <BikeSelectionContainer>
            <Header>เลือกประเภทของจักรยาน</Header>
            <CardContainer>
                {list.map(item => (
                    <BikeCard
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        text={item.text}
                        handleClick={handleCardClick}
                        selected={item.id === selected ? true : false}
                    />
                ))}
            </CardContainer>
        </BikeSelectionContainer>
    );
};

export default BikeSelection;
