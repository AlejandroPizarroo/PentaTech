import React, {useState} from 'react';
import {Header, HeaderName, Theme} from '@carbon/react';
import {Content,TextInput, Button} from '@carbon/react';
import {ArrowRight} from '@carbon/react/icons';
import {Link} from 'react-router-dom';


var emailData = new URLSearchParams();
var passwordPostData = new URLSearchParams();
const emailRegex = /^[\w.%+-]+@tec\.mx$/i;

const LoginPage = () => {
    const saveEmailRequestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: emailData
    };

    const verifyPasswordRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: passwordPostData
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [pageDir, setPageDir] = useState('/login');
   // const [twoFACode, setTwoFACode] = useState('');
    const [twoFAErrorMessage, setTwoFAErrorMessage] = useState('');
    let [otpContinue, setOtpContinue] = useState(false);
    const [isValidEmail, setIsValidEmail]  = useState(false);
    // PEDIRLE AYUDA A HECTOR
    const [userEmail, setUserEmail] = useState('');

    const handleLoginButtonClick = () => {
        if(pageDir === "/login") {
            setTwoFAErrorMessage("Invalid One-Time Password");
        }
    };

    const handleEmailInputChange = (event) => {
        if (emailRegex.test(event.target.value)) {
            //formData.append('email', event.target.value);
            setUserEmail(event.target.value);
            setIsValidEmail(true);
        } else {
           // formData = new URLSearchParams();
            setPageDir('/login');
            setIsValidEmail(false);
        }
    };

    const handleTwoFACodeChange = (event) => {

        if (event.target.value.length === 0 || (event.target.value.length === 6 &&/^[a-z0-9]{6}$/.test(event.target.value))) {
            setTwoFAErrorMessage('');
            if (event.target.value.length === 6 &&/^[a-z0-9]{6}$/.test(event.target.value)){

                emailData.append('password', event.target.value);
                handleLogin();
            }
        } else {
            setPageDir("/login");
            //formData = new URLSearchParams();
        }
    };

    const handleContinue = () => {
         var emailInput = document.getElementById("email-input").value;
        emailData.append('email', emailInput);

        fetch('http://localhost:5000/api/login/saveTemporalPassword', saveEmailRequestOptions)
            .then(response => response.json())
            .then(_ => {
                setErrorMessage('');
                setTwoFAErrorMessage('');
                setOtpContinue(true);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Invalid IBM email address');
            });
        if(otpContinue === true) {
            var resendButton = document.getElementById("resend-button");
            resendButton.disabled = "true";
        }
        emailData = new URLSearchParams();
    };

    const handleLogin = () => {
        fetch('http://localhost:5000/api/login/verifyTemporalPassword',  verifyPasswordRequestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    setErrorMessage('');
                    setTwoFAErrorMessage('');
                    setPageDir("/dashboard")
                }
            })
            .catch(error => {
                console.error('Error', error);
                setErrorMessage("Internal server error");
            });
       // formData = new URLSearchParams();
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
                        {!otpContinue ? (
                            <>
                                <TextInput
                                    id="email-input"
                                    type="email"
                                    labelText="w3id Credentials"
                                    placeholder="username@ibm.com"
                                    invalid={errorMessage !== ''}
                                    invalidText={errorMessage}
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
                                        onChange={handleTwoFACodeChange}
                                        placeholder="A 6-character OTP has been sent to your w3id email"
                                        invalid={twoFAErrorMessage !== ''}
                                        invalidText={twoFAErrorMessage}
                                        maxLength={6}
                                    />
                                </div>
                                <Button onClick={handleContinue} id="resend-button" className="resend-button" kind="secondary" >
                                    Resend OTP
                                </Button>
                                <Link to={pageDir} className="log-in-link">
                                    <Button onClick={handleLoginButtonClick} id="log-in-button" renderIcon={ArrowRight} className="log-in-button">
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
