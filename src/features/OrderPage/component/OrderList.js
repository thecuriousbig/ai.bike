import React from "react";
import styled from "styled-components";
import { color, fontFamily, fontSize } from "style/theme"


const UserOrder = styled.div`
    height: max-content;
    display: flex;
    flex-flow: row wrap;
    padding: 0.75rem;
    justify-content: flex-start;
`

UserOrder.Card = styled.div`
    width: 75%;
    height: max-content;
    border-radius: 20px;
    margin: 1rem;
    padding: 1rem;
    -webkit-box-shadow: 0px 2px 12px -2px ${color.grey3};
    box-shadow: 0px 2px 12px -2px ${color.grey3};
    
`

UserOrder.Header = styled.p`
    color: ${color.black};
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem - 0.25rem);
`
UserOrder.Content = styled.div`
    width: 100%;
    height: max-content;
`

UserOrder.Text = styled.p`
    font-size: calc(${fontSize.XS}rem - 0.25rem);
    color: ${props => {
        if (props.status === "DELIVERING")
            return `${color.green2}`;
        else if (props.status === "ARRIVED")
            return  `${color.orange2}`;
        else
            return `${color.grey3}` 
    }};
    strong {
        color: ${color.black}
    }
`

const OrderList = props => {

    const { orders } = props
    const convertDestination = ["อาคารวิศววัฒนะ","อาคารเรียนและปฎิบัติการทางศิลปศาสตร์", "ภาควิชาฟิสิกส์ คณะวิทยาศาสตร์", "KMUTT Library"]

    const renderOrders = () => {
        console.log(orders)
        if (orders === undefined || (Array.isArray(orders) && orders.length === 0))
            return <h1>NO AVAILABLE ORDERS</h1>
            
        const filteredOrders = orders.filter((value, index, array) => value !== undefined)
        if (filteredOrders.length === 0)
            return <h1>THERE IS ERROR OCCURRED IN ORDERS DISPLAY</h1>
        else 
            return (
                <UserOrder>
                    {filteredOrders.map((value, index) => {
                        return (
                            <UserOrder.Card key={index}>
                                <UserOrder.Header>ID: {"   "}{value.id.slice(0, 8)}</UserOrder.Header>
                                <UserOrder.Content>
                                    <UserOrder.Text status=""><strong>จุดหมาย{"   "}</strong> {convertDestination[value.destination - 1]}</UserOrder.Text>
                                    <UserOrder.Text status=""><strong>ประเภทจักรยาน{"   "}</strong> {value.vehicle}</UserOrder.Text>
                                    <UserOrder.Text status={value.status}><strong>สถานะ{"   "}</strong> {value.status}</UserOrder.Text>
                                </UserOrder.Content>
                            </UserOrder.Card>
                        )
                    }
                    )}
                </UserOrder>
            )
    }

    return renderOrders()
}

OrderList.defaultProps = {
    orders: []
}

export default OrderList;