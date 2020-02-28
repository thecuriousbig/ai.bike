import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import styled from "styled-components";
import HeadBar from "shared/HeadBar";
import Container from "./component/Container";
import ContentContainer from "./component/ContentContainer";
import OrderList from "./component/OrderList";
import { useUserContext } from "context/user"
import { device, fontSize, fontFamily, color } from "style/theme"

const Title = styled.span`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem + 0.25rem);
    color: ${color.black};
`;

const OrderPage = props => {
    const history = useHistory();
    const { user } = useUserContext();
    
    useEffect(() => {
        const fetchUserOrder = async () => {
            const currentUser = await API.get("user", `/user/${user}`);
            console.log(currentUser);
        }
        fetchUserOrder()
    })
    

    return (
        <Container>
            <HeadBar />
            <ContentContainer>
                <Title>ออเดอร์ของคุณ</Title>
                <OrderList />
            </ContentContainer>
        </Container>
    )
}

export default OrderPage