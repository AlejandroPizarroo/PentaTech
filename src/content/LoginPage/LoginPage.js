import React, { useState } from 'react';
import { Header, HeaderName, Theme } from '@carbon/react';
import { Grid, Column, TextInput, Button } from '@carbon/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@carbon/react/icons';

var formData = new URLSearchParams();
const emailRegex = /^[\w.%+-]+@tec\.mx$/i;

const HomePage = () => {
    const saveTemporalPasswordRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
    };

    const verifyPasswordRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
    }
    const [errorMessage, setErrorMessage] = useState('');
    const [pageDir, setPageDir] = useState('/login');
    const [twoFACode, setTwoFACode] = useState('');
    const [twoFAErrorMessage, setTwoFAErrorMessage] = useState('');
    const [isRequestingTwoFA, setIsRequestingTwoFA] = useState(false);
    const [isValidEmail, setIsValidEmail]  = useState(false);

    const handleLoginButtonClick = () => {
        if(pageDir === "/login") {
            setTwoFAErrorMessage("Invalid 2FA code");
        }
    };

    const handleEmailInputChange = (event) => {
        if (emailRegex.test(event.target.value)) {
            formData.append('email', event.target.value);
            setIsValidEmail(true);
        } else {
            formData = new URLSearchParams();
            setPageDir('/login');
            setIsValidEmail(false);
        }
    };

    const handleTwoFACodeChange = (event) => {
        setTwoFACode(event.target.value);
        if (event.target.value.length === 0 || (event.target.value.length === 6 &&/^[a-z0-9]{6}$/.test(event.target.value))) {
            setTwoFAErrorMessage('');
            if (event.target.value.length === 6 &&/^[a-z0-9]{6}$/.test(event.target.value)){

                formData.append('password', event.target.value);
                handleLogin();
            }
        } else {
            setPageDir("/login");
            formData = new URLSearchParams();
        }
    };

    const handleRequestTwoFA = () => {
        if(isValidEmail){
            fetch('http://localhost:5000/api/login/saveTemporalPassword', saveTemporalPasswordRequestOptions)
                .then(response => response.json())
                .then(_ => {
                    setErrorMessage('');
                    setTwoFAErrorMessage('');
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage('Invalid email');
                });
            formData = new URLSearchParams();
            setIsRequestingTwoFA(true);
        }
        setErrorMessage(isValidEmail ? '' : 'Invalid email');
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
        formData = new URLSearchParams();
    };

    return (
        <body className="login-background">
        <Theme theme="g100">
            <Header aria-label="IBM Platform Name">
                <HeaderName prefix="IBM">
                    Certifications Dashboard
                </HeaderName>
            </Header>
        </Theme>
        <Grid fullWidth condensed>
            <Column lg={16} md={8} sm={4} className="upper-break" />
            <Column lg={16} md={8} sm={4}>
                <Grid fullWidth condensed>
                    <Column
                        lg={{ span: 8, offset: 4 }}
                        md={{ span: 4, offset: 2 }}
                        sm={{ span: 2, offset: 1 }}
                    >
                        <Theme theme="g100">
                            <h3>&nbsp;Login to the IBM Certifications Dashboard</h3>
                            <TextInput
                                id="text-input-1"
                                type="email"
                                labelText={<>&nbsp;&nbsp;IBMid</>}
                                onChange={handleEmailInputChange}
                                placeholder="username@ibm.com"
                                invalid={errorMessage !== ''}
                                invalidText={errorMessage}
                            />
                            {isRequestingTwoFA ? (
                                <>
                                    <Button enabled>
                                        Request 2FA Code
                                    </Button>
                                    <div>&nbsp;</div>
                                    <TextInput
                                        id="text-input-2fa"
                                        type="password"
                                        labelText={<>&nbsp;&nbsp;2FA Code</>}
                                        onChange={handleTwoFACodeChange}
                                        invalid={twoFAErrorMessage !== ''}
                                        invalidText={twoFAErrorMessage}
                                        maxLength={6}
                                    />
                                </>
                            ) : (
                                <Button onClick={handleRequestTwoFA}>
                                    Request 2FA Code
                                </Button>
                            )}
                            <Link to={pageDir}>
                                <Button onClick={handleLoginButtonClick} renderIcon={ArrowRight} disabled={twoFACode.length !== 6}>
                                    Login
                                </Button>
                            </Link>
                        </Theme>
                    </Column>
                </Grid>
            </Column>
        </Grid>
        </body>
    );
};

export default HomePage;
