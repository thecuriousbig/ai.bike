import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device, fontFamily, fontSize, color } from "style/theme";
import background from "assets/images/background.jpg";

const Container = styled.div`
    height: 100vh;
`;

const Header = styled.div`
    height: 70vh;
    background: url(${background}) 60%;
    background-size: cover;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    padding-left: 5vw;
    @media ${device.tablet} {
        padding-left: 10vw;
    }
    span:first-child {
        color: ${color.white};
        font-size: ${fontSize.S}rem;
        text-transform: uppercase;
        @media ${device.tablet} {
            font-size: calc(${fontSize.S}rem + 0.5rem);
        }
        @media ${device.laptop} {
            font-size: calc(${fontSize.M}rem + 0.5rem);
        }
    }
    span:last-of-type {
        width: 60vmin;
        color: ${color.white};
        font-size: ${fontSize.XS}rem;
        @media ${device.laptop} {
            width: 65vmin;
            font-size: calc(${fontSize.XS}rem + 0.5rem);
        }
    }
    a {
        width: 10rem;
        line-height: 3rem;
        margin: 1rem 0 0 0;
        font-family: ${fontFamily};
        font-size: ${fontSize.XS}rem;
        text-decoration: none;
        text-align: center;
        color: ${color.white};
        background: ${color.green1};
        border: none;
        border-radius: 1.5rem;
    }
`;

const Content = styled.div`
    height: 30vh;
    background: ${color.brown};
    position: relative;
    span {
        width: 80vmin;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${color.white};
        text-align: center;
        @media ${device.laptop} {
            font-size: calc(${fontSize.XS}rem + 0.5rem);
        }
    }
`;

const HomePage = props => {
    return (
        <Container>
            <Header>
                <span>bike.ai</span>
                <span>
                    บริการรูปแบบใหม่ช่วยให้การเดินทางของคุณสะดวกยิ่งขึ้น
                </span>
                <Link to="/order">เริ่มต้นใช้งาน</Link>
            </Header>
            <Content>
                <span>
                    แอปพลิเคชัน BIKE.AI
                    ตอบโจทย์ทุกความต้องการด้วยบริการจักรยานสาธารณะรูปแบบใหม่ที่จะคอยช่วยเหลือคุณได้ทุกเมื่อที่คุณต้องการ
                </span>
            </Content>
        </Container>
    );
}

export default HomePage;
