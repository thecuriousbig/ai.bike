import React, { useState } from "react";
import styled from "styled-components";
import { Auth, API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Background from "../component/Background";
import BottomText from "../component/BottomText";
import InputGroup from "../component/InputGroup";
import HeaderText from "../component/HeaderText";
import ErrorText from "../component/ErrorText";
import Button from "../component/Button";
import { device, fontFamily, fontSize, color } from "style/theme";

const StyledBackground = styled(Background)`
    display: grid;
    grid-template-columns: auto 75% auto;
    grid-template-rows: 10% ${props => (props.confirm ? "25rem" : "35rem")} auto;
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
    justify-content: space-between;
    align-items: center;
`;

const CodeResendText = styled.span`
    font-family: ${fontFamily};
    font-size: calc(${fontSize.XS}rem - 0.125rem);
    color: ${color.green1};
    text-decoration: underline;
    text-align: start;
`;
/**
 * SignupPage component - for signing up new user and store user to amazon cognito user pool.
 * @param {*} props
 */
function SignupPage(props) {
    /* create history instance for changing route */
    const history = useHistory();
    /* initialize all parameters needed for signing up a new user. */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("+66");
    const [authenticationCode, setAuthenticationCode] = useState("");
    /* initialize parameters that are useful for styling this page. */
    const [confirmUsername, setConfirmUsername] = useState("");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState(
        "*เกิดข้อผิดพลาดในการสมัครสมาชิก"
    );
    const [confirm, setConfirm] = useState(false);

    /**
     * onChange's function event handler for those inputs.
     * @param {*} e target event object.
     */
    const onChange = e => {
        /* switch case for each parameters */
        switch (e.target.name) {
            case "username":
                return setUsername(e.target.value);
            case "password":
                return setPassword(e.target.value);
            case "email":
                return setEmail(e.target.value);
            case "authenticationCode":
                return setAuthenticationCode(e.target.value);
            case "phoneNumber":
                return setPhoneNumber(
                    "+66" + e.target.value.substr("+66".length)
                );
            default:
                return;
        }
    };

    /**
     * signing new user up by using Auth.signUp method from aws-amplify.
     */
    const signUp = async (e) => {
        e.preventDefault()
        try {
            /* async call signUp method */
            await Auth.signUp({
                username,
                password,
                attributes: { email, phone_number: phoneNumber }
            });
            /* If can reach this. That's mean signing up is successful. */
            /* store username. For using in resend signup code function in the future. */
            setConfirmUsername(username);
            /* clear all user's input values. */
            setError(false);
            setUsername("");
            setPassword("");
            setPhoneNumber("");
            setEmail("");
            /* set confirm to TRUE for changing UIs to confirm page. */
            setConfirm(true);
        } catch (error) {
            console.log(error);
            /* show the error messages. */
            setErrorText("*เกิดข้อผิดพลาดในการสมัครสมาชิก");
            setError(true);
        }
    };

    /**
     * confirm signing new user by sending a verification code to user's email.
     * User need that code to confirm signUp.
     */
    const confirmSignUp = async (e) => {
        e.preventDefault()
        try {
            /* async call confirmSignUp. */
            await Auth.confirmSignUp(username, authenticationCode);
            /* If can reach this. That's mean confirmSignUp is successful. */
            /* Store new user to DynamoDB */
            const body = {
                name: username,
                orders: [], // new registered user don't have any orders.
                createdAt: new Date(Date.now()).toLocaleString()
            }
            const newUser = await API.post("user", "/user", {body})
            console.log("registered new user to database: ", newUser)
            /* clear all user's confirm value. */
            setError(false);
            setUsername("");
            setAuthenticationCode("");
            /* redirect to signin page */
            history.push("/signin");
        } catch (error) {
            console.log(`confirm signup error: ${error}`);
            /* show the error messages. */
            setErrorText("*เกิดข้อผิดพลาดในการยืนยันตัวตน");
            setError(true);
        }
    };

    /**
     * resend the user's confirm signup code to user's email again.
     */
    const resendCode = async () => {
        try {
            /* async call resendSignUp. */
            await Auth.resendSignUp(confirmUsername);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * render signup UI.
     */
    const renderSignUp = () => {
        return (
            <Container>
                <form onSubmit={signUp}>
                    <StyledHeaderText
                        text={confirm ? "ยืนยันการสมัครสมาชิก" : "สมัครสมาชิก"}
                    />
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
                    <StyledInputGroup
                        name="email"
                        type="email"
                        placeholder="อีเมล"
                        label="อีเมล*"
                        value={email}
                        onChange={onChange}
                    />
                    <StyledInputGroup
                        name="phoneNumber"
                        type="text"
                        placeholder="+66"
                        label="เบอร์โทรศัพท์*"
                        value={phoneNumber}
                        onChange={onChange}
                    />
                    <ActionGroup>
                        <BottomText
                            text="เป็นสมาชิกอยู่แล้ว? "
                            aText="เข้าสู่ระบบ"
                            path="/signin"
                        />
                        <Button text="สมัครสมาชิก" type="submit" />
                    </ActionGroup>
                </form>
            </Container>
        );
    };

    /**
     * render confirm sign up UI.
     */
    const renderConfirmSignUp = () => {
        return (
            <Container>
                <form onSubmit={confirmSignUp}>
                    <StyledHeaderText
                        text={confirm ? "ยืนยันการสมัครสมาชิก" : "สมัครสมาชิก"}
                    />
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
                        name="authenticationCode"
                        type="text"
                        placeholder="รหัสยืนยันตัวตน"
                        label="รหัสยืนยันตัวตน*"
                        value={authenticationCode}
                        onChange={onChange}
                    />
                    <ActionGroup confirm={confirm}>
                        <CodeResendText onClick={resendCode}>
                            ส่งรหัสยืนยันใหม่?
                        </CodeResendText>
                        <Button
                            text="ยืนยันตัวตน"
                            onKeyUp={e =>
                                e.keyCode === 13 ? confirmSignUp : null
                            }
                            onClick={confirmSignUp}
                        />
                    </ActionGroup>
                </form>
            </Container>
        );
    };

    return (
        <StyledBackground confirm={confirm}>
            {!confirm ? renderSignUp() : renderConfirmSignUp()}
        </StyledBackground>
    );
}

export default SignupPage;
