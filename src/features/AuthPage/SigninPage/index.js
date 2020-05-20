import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useAuthContext } from "context/authentication";
import { useUserContext } from "context/user";
import Button from "../component/Button";
import HeaderText from "../component/HeaderText";
import ErrorText from "../component/ErrorText";
import InputGroup from "../component/InputGroup";
import Background from "../component/Background";
import BottomText from "../component/BottomText";
import { device, color, fontSize, fontFamily } from "style/theme";

const StyledBackground = styled(Background)`
    display: grid;
    grid-template-columns: auto 75% auto;
    grid-template-rows: 10% ${props => props.height} auto;
    grid-template-areas:
        ".  .  ."
        ". box ."
        ".  .  .";
    @media ${device.tablet} {
        grid-template-columns: auto 40% auto;
    }
    @media ${device.laptop} {
        grid-template-columns: auto 40% auto; 
    }
    @media ${device.desktop} {
        grid-template-columns: auto 25% auto;
    }
`;

const Container = styled.div`
    height: 100%;
    width: 100%;
    grid-area: box;
    position: relative;
    border-radius: 1.5rem;
    background: ${color.black};
    opacity: 90%;
`;

const StyledHeaderText = styled(HeaderText)`
    padding: 2rem 0 1rem 0;
    @media ${device.laptop} {
        font-size: ${fontSize.S}rem; /* 2rem */
    }
`;

const StyledInputGroup = styled(InputGroup)`
    width: 80%;
    margin: 0 auto;
`;

const ActionGroup = styled.div`
    width: 80%;
    margin: 0 auto;
    margin-top: 5%;
    display: flex;
    justify-content: ${props =>
        props.onlyButton ? "flex-end" : "space-between"};
    align-items: center;
`;

const Text = styled.p`
    width: 80%;
    margin: 0 auto;
    text-align: start;
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem - 0.25rem);
    color: ${color.white};
    span {
        color: ${color.green1};
        text-decoration: underline;
        cursor: pointer;
    }
`;

/**
 * Signing a user before user go to other page.
 * @param {*} props
 */
function SigninPage(props) {
    /* auth context */
    const { authentication } = useAuthContext();
    const { setUser } = useUserContext()
    /* create history */
    const history = useHistory();
    /* initialize all parameters use for signing in. */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    /* initialize all parameters that are useful for styling UIs. */
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState(
        "*เกิดข้อผิดพลาดในการเข้าสู่ระบบ"
    );
    const [forgotPass, setForgotPass] = useState(false);
    const [confirmPass, setConfirmPass] = useState(false);

    /**  
     * onChange event handler for those input.
     * @param {*} e target's event object.
     */
    const onChange = e => {
        if (e.target.name === "username") setUsername(e.target.value);
        else if (e.target.name === "password") setPassword(e.target.value);
        else if (e.target.name === "code") setCode(e.target.value);
    };

    /**
     * Use for sign in a user.
     */
    const signIn = async (e) => {
        e.preventDefault();
        try {
            /* async call signIn method. */
            await Auth.signIn(username, password);
            /* If can reach this. That's mean signIn is successful. */
            /* set user context */
            setUser(username)
            /* reset all user's input value. */
            setUsername("");
            setPassword("");
            setError(false);
            /* set auth value from AuthRoute for authenticated user. */
            authentication(true);
            /* go to order page. */
            history.push("/order");
        } catch (error) {
            console.log(error);
            console.log(`signin error: ${error}`);
            /* show the error messages. */
            if (error.code === "UserNotFoundException")
                setErrorText("*ไม่พบบัญชีผู้ใช้ที่ตรงกับที่คุณป้อนข้อมูลมา");
            else if (error.code === "InvalidParameterException")
                setErrorText("*กรุณากรอกข้อมูลให้ครบ")
            else if (error.code === "NotAuthorizedException")
                setErrorText("*ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
            else setErrorText("*เกิดข้อผิดพลาดบางอย่างในการเข้าสู่ระบบ")
            setError(true);
        }
    };

    /**
     * Initial method for set new password.
     */
    const initForgotPassword = () => {
        /* reset all user's input values */
        setUsername("");
        setPassword("");
        /* set forgotPass to TRUE to change UI to forgotPassword variance. */
        setForgotPass(true);
    };

    /**
     * Accept username to create a forgotPassword request to grant a permission to set new password.
     */
    const forgotPassword = async (e) => {
        e.preventDefault()
        try {
            await Auth.forgotPassword(username);
            /* if can reach this. That's mean forgot password request is accept. */
            /* clear all user's input values. */
            setUsername("");
            setPassword("");
            setError(false);
            /* go to confirm forgot password step. */
            setConfirmPass(true);
        } catch (error) {
            console.log(error);
            console.log(`forgot password error: ${error}`);
            setError(true);
            setErrorText("*เกิดข้อผิดพลาดบางอย่าง");
        }
    };

    /**
     * confirm user's forgot password request and create new password.
     */
    const confirmForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await Auth.forgotPasswordSubmit(username, code, password);
            /* If can reach this, That's mean create password successful. */
            /* clear all user's input values. */
            setUsername("");
            setPassword("");
            setCode("");
            setError(false);
            setErrorText("*เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
            setConfirmPass(false);
            setForgotPass(false);
        } catch (error) {
            setErrorText("*เกิดข้อผิดพลาดในการสร้างรหัสผ่านใหม่");
            setError(true);
        }
    };

    /**
     * Render component in regular signin variance.
     */
    const renderSignIn = () => {
        return (
            <Container>
                <form onSubmit={signIn}>
                    <StyledHeaderText text="เข้าสู่ระบบ" />
                    {error && <ErrorText text={errorText} />}
                    <StyledInputGroup
                        name="username"
                        type="text"
                        placeholder="ชื่อ"
                        label="ชื่อผู้ใช้*"
                        value={username}
                        onChange={onChange}
                    />
                    <StyledInputGroup
                        name="password"
                        type="password"
                        placeholder="รหัสผ่าน"
                        label="รหัสผ่าน*"
                        value={password}
                        onChange={onChange}
                    />
                    <Text>
                        ลืมรหัสผ่าน?{" "}
                        <span onClick={() => initForgotPassword()}>
                            เปลี่ยนรหัสผ่าน
                        </span>
                    </Text>
                    <ActionGroup>
                        <BottomText
                            text="ยังไม่ได้เป็นสมาชิก? "
                            aText="สมัครสมาชิก"
                            path="/signup"
                        />
                        <Button
                            text="เข้าสู่ระบบ"
                            type="submit"
                        />
                    </ActionGroup>
                </form>
            </Container>
        );
    };

    /**
     * Render UI in forgot password variance.
     */
    const renderForgotPassword = () => {
        return (
            <Container>
                <form onSubmit={forgotPassword}>
                    <StyledHeaderText text="ลืมรหัสผ่าน" />
                    {error && <ErrorText text={errorText} />}
                    <StyledInputGroup
                        name="username"
                        type="text"
                        placeholder="ชื่อ"
                        label="ชื่อผู้ใช้*"
                        value={username}
                        onChange={onChange}
                    />
                    <ActionGroup onlyButton>
                        <Button
                            text="สร้างรหัสผ่านใหม่"
                            type="submit"
                            // onKeyUp={e => e.keyCode === 13? forgotPassword: null}
                            // onClick={forgotPassword}
                        />
                    </ActionGroup>
                </form>
            </Container>
        );
    };

    const renderConfirmForgotPassword = () => {
        return (
            <Container>
                <form onSubmit={confirmForgotPassword}>

                    <StyledHeaderText text="สร้างรหัสผ่านใหม่" />
                    {error && <ErrorText text={errorText} />}
                    <StyledInputGroup
                        name="username"
                        type="text"
                        placeholder="ชื่อ"
                        label="ชื่อผู้ใช้*"
                        value={username}
                        onChange={onChange}
                    />
                    <StyledInputGroup
                        name="code"
                        type="text"
                        placeholder="รหัสยืนยันตัวตน"
                        label="รหัสยืนยันตัวตน*"
                        value={code}
                        onChange={onChange}
                    />
                    <StyledInputGroup
                        name="password"
                        type="password"
                        placeholder="รหัสผ่านใหม่"
                        label="รหัสผ่านใหม่*"
                        value={password}
                        onChange={onChange}
                    />
                    <ActionGroup onlyButton>
                        <Button
                            text="สร้างรหัสผ่านใหม่"
                            type="submit"
                            // onKeyUp={e => e.keyCode === 13? confirmForgotPassword: null}
                            // onClick={confirmForgotPassword}
                        />
                    </ActionGroup>
                </form>
            </Container>
        );
    };

    return (
        <StyledBackground
            height={() => {
                if (!forgotPass) {
                    /* sign in */
                    return "25rem";
                } else if (!confirmPass) {
                    /* forgot password */
                    return "20rem";
                } else {
                    /* confirm forgot password */
                    return "30rem";
                }
            }}
        >
            {!forgotPass
                ? renderSignIn()
                : !confirmPass
                ? renderForgotPassword()
                : renderConfirmForgotPassword()}
        </StyledBackground>
    );
}

export default SigninPage;
