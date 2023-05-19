import React, { useState } from 'react';
import { Header, HeaderName, Theme } from '@carbon/react';
import { Grid, Column, TextInput, Button } from '@carbon/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@carbon/react/icons';

var formData = new URLSearchParams();
const emailRegex = /^[\w.%+-]+@tec\.mx$/i;

const HomePage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [pageDir, setPageDir] = useState('/login');
    const [twoFACode, setTwoFACode] = useState('');
    const [twoFAErrorMessage, setTwoFAErrorMessage] = useState('');
    const [isRequestingTwoFA, setIsRequestingTwoFA] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        const isValidEmail = emailRegex.test(event.target.value);
        setErrorMessage(isValidEmail ? '' : 'Correo electrónico inválido');
        if (isValidEmail) {
            formData.append('email', event.target.value);
            setPageDir('/dashboard');
        } else {
            formData = new URLSearchParams();
            setPageDir('/login');
        }
    };

    const handleTwoFACodeChange = (event) => {
        const { value } = event.target;
        setTwoFACode(value);
        if (value.length === 0 || (value.length === 6 && /^\d+$/.test(value))) {
            setTwoFAErrorMessage('');
        } else {
            setTwoFAErrorMessage('El código 2FA debe ser de 6 dígitos');
        }
    };

    const handleRequestTwoFA = () => {
        setIsRequestingTwoFA(true);
    };

    const handleButtonClick = () => {
        if (twoFACode.length === 6 && /^\d+$/.test(twoFACode)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            };

            fetch('http://localhost:5000/api/auth/verifyEmail', requestOptions)
                .then(response => response.json())
                .then(_ => {
                    setErrorMessage('');
                    setTwoFAErrorMessage('');
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage('Se ingresó un correo electrónico inválido');
                });
            formData = new URLSearchParams();
        } else {
            setTwoFAErrorMessage('El código 2FA debe ser de 6 dígitos');
        }
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
                            <h3>&nbsp;Log in to the IBM Certifications Dashboard</h3>
                            <TextInput
                                id="text-input-1"
                                type="email"
                                labelText={<>&nbsp;&nbsp;IBMid</>}
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="username@ibm.com"
                                invalid={errorMessage !== ''}
                                invalidText={errorMessage}
                            />
                            {pageDir === '/dashboard' && (
                                <>
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
                                                value={twoFACode}
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
                                </>
                            )}
                            <Link to={pageDir}>
                                <Button renderIcon={ArrowRight} onClick={handleButtonClick} disabled={twoFACode.length !== 6}>
                                    Log in
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
