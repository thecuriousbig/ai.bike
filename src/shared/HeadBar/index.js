import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify"
import { fontFamily, fontSize, color, device } from "style/theme";
import Menu from "../Icons/Menu";
import { useRouteDispatchContext } from "context/routing";
import { reset } from "context/routing/action";

const Header = styled.div`
    width: 100%;
    height: 4rem; /* 64px */
    display: block;
    background: ${color.white};
    border: 1px solid ${color.grey0};
`;

const InnerHeader = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    position: relative;
    @media ${device.laptop} {
        width: 90%;
    }
`;

const LogoContainer = styled.div`
    height: 100%;
    display: table;
    float: left;
    h1 {
        display: table-cell;
        vertical-align: middle;
        padding: 0.75rem 1rem;
        font-family: ${fontFamily};
        font-size: calc(${fontSize.XS}rem + 0.5rem); /* 1.5rem */
        font-weight: 700;
        text-transform: uppercase;
        color: ${color.black};
    }
`;

const Navigation = styled.ul`
    display: none; /* usually hide it when are on mobile phone. */
    @media ${device.laptop} {
        display: block;
        height: 100%;
        float: right;
    }
`;

Navigation.Link = styled.a`
    height: 100%;
    display: table;
    float: left;
    padding: 0 1rem;
    cursor: pointer;
`;
Navigation.ListItem = styled.li`
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    font-family: ${fontFamily};
    font-size: ${fontSize.XS};
    color: ${color.black};
`;

const MenuToggleIcon = styled.a`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${device.laptop} {
        display: none; /* hide it when on larger screen size. */
    }
`;

const MenuToggleWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    display: block;
    margin-top: 2px;
    background: ${color.white};
    z-index: 100;
    ${props => {
        if (props.active) {
            return `
                top: 4rem;
                right: 0px;
            `;
        } else {
            return `
                top: 0;
                right: -100%;
            `;
        }
    }}
`;

const MenuToggleNavigation = styled.ul`
    width: 100%;
    background-color: ${color.white};
    display: block;
    list-style: none;
`;

MenuToggleNavigation.Item = styled.li`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px soild ${color.grey0};
`;

function HeadBar(props) {
    const [active, setActive] = useState(false);
    const { history, location } = props;
    const routeDispatch = useRouteDispatchContext();

    /**
     * Handle the user's click event on navigation menu.
     * @param {*} e 
     */
    const handleNavigationClick = e => {
        if (e.target.innerText === "หน้าแรก") {
            return clearStateAndGoToPath('/order')
        } else if (e.target.innerText === "สั่งจอง") {
            /* check if current location is the same. */
            /* if same do nothing, otherwise go to /order/step-one and clear all current state. */
            return location.pathname === '/order/step-one' ? null: clearStateAndGoToPath('/order/step-one');
        }
    };

    /**
     * Clear all states such as user's routing data and push to new path.
     * @param {String} path 
     */
    const clearStateAndGoToPath = path => {
        /* clear user state. */
        reset(routeDispatch);
        /* push history path */
        history.push(path)
    }

    const logout = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            console.log(currentUser);
            await Auth.signOut(currentUser);
            /* if can reach this. Go back to home page. */
            history.replace("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Header>
            <InnerHeader>
                <LogoContainer>
                    <h1>bike.ai</h1>
                </LogoContainer>
                <Navigation>
                    <Navigation.Link onClick={handleNavigationClick}>
                        <Navigation.ListItem>
                            หน้าแรก
                        </Navigation.ListItem>
                    </Navigation.Link>
                    <Navigation.Link onClick={handleNavigationClick}>
                        <Navigation.ListItem>
                            สั่งจอง
                        </Navigation.ListItem>
                    </Navigation.Link>
                    <Navigation.Link onClick={logout}>
                        <Navigation.ListItem>ออกจากระบบ</Navigation.ListItem>
                    </Navigation.Link>
                </Navigation>
                <MenuToggleIcon
                    onClick={() => {
                        setActive(!active);
                    }}
                >
                    <Menu />
                </MenuToggleIcon>
                <MenuToggleWrapper active={active}>
                    <MenuToggleNavigation>
                        <MenuToggleNavigation.Item
                            onClick={handleNavigationClick}
                        >
                            <span>หน้าแรก</span>
                        </MenuToggleNavigation.Item>
                        <MenuToggleNavigation.Item
                            onClick={handleNavigationClick}
                        >
                            <span>สั่งจอง</span>
                        </MenuToggleNavigation.Item>
                        <MenuToggleNavigation.Item onClick={logout}>
                            <span>ออกจากระบบ</span>
                        </MenuToggleNavigation.Item>
                    </MenuToggleNavigation>
                </MenuToggleWrapper>
            </InnerHeader>
        </Header>
    );
}

export default withRouter(HeadBar);
