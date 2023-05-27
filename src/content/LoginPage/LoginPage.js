import React, {useState} from 'react';
import {Header, HeaderName, Theme} from '@carbon/react';
import {Content,TextInput, Button} from '@carbon/react';
import {ArrowRight} from '@carbon/react/icons';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ user, setUser }) => {
    var data = new URLSearchParams();
    const [userEmail, setUserEmail] = useState(user?.email);
    const [userPassword, setUserPassword] = useState('');
    var [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState(user?.password ? 'Invalid One-Time Password' : '');
    const navigate = useNavigate();

    const otpCreationRequest = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
    };

    const handleOtpRequest = () => {
        if(user?.email) {
            document.getElementById("resend-button").disabled = true;
        }
        data = new URLSearchParams();
        data.append('email', userEmail);
        otpCreationRequest.body = data;
        fetch('http://localhost:5000/api/login/requestOtpCreation', otpCreationRequest)
            .then(response => response.json())
            .then(_ => {
                setEmailError('');
                setUser({ email: userEmail });
            })
            .catch(error => {
                setEmailError('Invalid IBM email address');
            });
    };

    const handleLoginRequest = () => {
        setUser({ email: user.email, password: userPassword ?userPassword : ' '});
        navigate('/dashboard');
    };

    return (
        <>
            <Theme theme="g100">
                <Header aria-label="IBM Platform Name">
                    <HeaderName prefix="IBM">
                        Certifications Dashboard
                    </HeaderName>
                </Header>
            </Theme>
            <Content className="login-background">
                <div className="content-div">
                    <Theme theme="g100">
                        <h3 className="header-padding">Log in to the IBM Certifications Dashboard</h3>
                        {!(user?.email) ? (
                            <>
                                <TextInput
                                    id="email-input"
                                    className="email-input"
                                    type="email"
                                    labelText="w3id Credentials"
                                    placeholder="username@ibm.com"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    invalid={emailError !== ''}
                                    invalidText={emailError}
                                />
                                <Button onClick={() => handleOtpRequest()} id="continue-button" renderIcon={ArrowRight} className="continue-button">
                                    Continue
                                </Button>
                            </>
                        ) : (
                            <>
                                <p className="log-in-message">
                                    Logging in as {user.email}&nbsp;
                                    <Button className="function-text" onClick={() => setUser({})}>
                                        Not you?
                                    </Button>
                                </p>
                                <div className="password-input">
                                    <TextInput.PasswordInput
                                        id="password-input"
                                        type="password"
                                        labelText="One-Time Password"
                                        placeholder="A 6-character OTP has been sent to your w3id email"
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                        invalid={passwordError !== ''}
                                        invalidText={passwordError}
                                        maxLength={6}
                                    />
                                </div>
                                <Button onClick={() => handleOtpRequest()} id="resend-button" className="resend-button" kind="secondary" >
                                    Resend OTP
                                </Button>
                                <Button onClick={handleLoginRequest} id="log-in-button" renderIcon={ArrowRight} className="log-in-button">
                                    Log in
                                </Button>

                            </>
                        )}
                    </Theme>
                </div>
            </Content>
        </>
    );
};

export default LoginPage;
