import React, { useEffect, useState, useCallback } from "react";
import { API } from "aws-amplify";
import styled from "styled-components";
import HeadBar from "shared/HeadBar";
import Container from "./component/Container";
import ContentContainer from "./component/ContentContainer";
import OrderList from "./component/OrderList";
import { useUserContext } from "context/user"
import { fontSize, fontFamily, color } from "style/theme"

const Title = styled.span`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem + 0.25rem);
    color: ${color.black};
`;

const OrderPage = props => {
    const { user } = useUserContext();
    const [orderList, setOrderList] = useState([])
    


    const fetchUserOrder = useCallback(async () => {
        const users = await API.get("user", `/user/${user}`, { 'responseType': 'json' });
        const { orders } = users[0];
        let allOrder = []
        await Promise.all(orders.map(async (id) => {
            const order = await API.get("order", `/order/${id}`, { 'responseType': 'json' });
            allOrder.push(order[0]);
        }))
        setOrderList(allOrder)
    }, [setOrderList, user])

    useEffect(() => {
        fetchUserOrder()
    }, [fetchUserOrder])

    return (
        <Container>
            <HeadBar />
            <ContentContainer>
                <Title>ออเดอร์ของคุณ</Title>
                <OrderList orders={orderList} />
            </ContentContainer>
        </Container>
    )
}

export default OrderPage