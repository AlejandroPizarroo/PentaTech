import React, {useState} from 'react';
import {Header, HeaderName, Theme} from '@carbon/react';
import {Content,TextInput, Button} from '@carbon/react';
import {ArrowRight} from '@carbon/react/icons';
import {Link} from 'react-router-dom';


var emailData = new URLSearchParams();
// var passwordData = new URLSearchParams();

const LoginPage = () => {

    var [otpContinue, setOtpContinue] = useState(false);
    var [userEmail, setUserEmail] = useState('');
    var [emailError, setEmailError] = useState('');

    const requestOtpForEmail = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: emailData
    };

    const handleContinue = () => {
        if(otpContinue === false) {
            emailData.append('email', document.getElementById("email-input").value);
            requestOtpForEmail.body = emailData;
            setUserEmail(document.getElementById("email-input").value);
        } else {
            emailData.append('email', userEmail);
            requestOtpForEmail.body = emailData;
            document.getElementById("resend-button").disabled = true;
        }
        fetch('http://localhost:5000/api/login/requestOtpForEmail', requestOtpForEmail)
            .then(response => response.json())
            .then(_ => {
                setEmailError('');
                setOtpContinue(true);
            })
            .catch(error => {
                setEmailError('Invalid IBM email address');
            });
        emailData = new URLSearchParams();
    };

    // const [pageDir, setPageDir] = useState('/login');
    // const [twoFACode, setTwoFACode] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    //
    // const verifyPasswordRequestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     body: passwordData
    // }
    //
    // const handleLoginButtonClick = () => {
    //     if(pageDir === "/login") {
    //         setTwoFAErrorMessage("Invalid One-Time Password");
    //     }
    // };
    //
    // const handleTwoFACodeChange = (event) => {
    //
    //     if (event.target.value.length === 0 || (event.target.value.length === 6 &&/^[a-z0-9]{6}$/.test(event.target.value))) {
    //         setTwoFAErrorMessage('');
    //         if (event.target.value.length === 6 &&/^[a-z0-9]{6}$/.test(event.target.value)){
    //
    //             emailData.append('password', event.target.value);
    //             handleLogin();
    //         }
    //     } else {
    //         setPageDir("/login");
    //         //formData = new URLSearchParams();
    //     }
    // };
    //
    // const handleLogin = () => {
    //     fetch('http://localhost:5000/api/login/verifyTemporalPassword',  verifyPasswordRequestOptions)
    //         .then(response => response.json())
    //         .then(data => {
    //             if(data.success){
    //                 setErrorMessage('');
    //                 setTwoFAErrorMessage('');
    //                 setPageDir("/dashboard")
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error', error);
    //             setErrorMessage("Internal server error");
    //         });
    //    // formData = new URLSearchParams();
    // };

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
                        {!otpContinue ? (
                            <>
                                <TextInput
                                    id="email-input"
                                    type="email"
                                    labelText="w3id Credentials"
                                    placeholder="username@ibm.com"
                                    invalid={emailError !== ''}
                                    invalidText={emailError}
                                    className="email-input"
                                />
                                <Button onClick={handleContinue} id="continue-button" renderIcon={ArrowRight} className="continue-button">
                                    Continue
                                </Button>
                            </>
                        ) : (
                            <>
                                <p className="log-in-message">
                                    Logging in as {userEmail}&nbsp;
                                    <Button className="function-text" onClick={() => setOtpContinue(false)}>
                                        Not you?
                                    </Button>
                                </p>
                                <div className="password-input">
                                    <TextInput.PasswordInput
                                        id="password-input"
                                        type="password"
                                        labelText="One-Time Password"
                                        placeholder="A 6-character OTP has been sent to your w3id email"
                                        // invalid={passwordError !== ''}
                                        // invalidText={passwordError}
                                        maxLength={6}
                                    />
                                </div>
                                <Button onClick={handleContinue} id="resend-button" className="resend-button" kind="secondary" >
                                    Resend OTP
                                </Button>
                                <Link /*to={pageDir}*/ className="log-in-link">
                                    <Button /*onClick={handleLoginButtonClick}*/ id="log-in-button" renderIcon={ArrowRight} className="log-in-button">
                                        Log in
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Theme>
                </div>
            </Content>
        </>
    );
};

export default LoginPage;
