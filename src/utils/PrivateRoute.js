import React, { useState, useEffect } from "react";
import {Header, HeaderName, Theme, Content, PasswordInput, Button} from "@carbon/react";
import {ArrowRight} from '@carbon/react/icons';
import { Navigate } from "react-router-dom";

const otpVerification = (email, password) => {
    return new Promise((resolve) => {
        fetch(`http://137.184.144.88:5000/api/login/requestOtpVerification/${password}/${email}`)
            .then(response => response.json())
            .then((res) => {
                if(res.success) {
                    resolve(1);
                }
                resolve(2);
            })
            .catch(_ => {
                resolve(2);
            });
    })
}

const PrivateRoute = ({children, user}) => {
    const [auth, setAuth] = useState(0);
    useEffect(() => {
        (async function() {
            try {
                setAuth(await otpVerification(user.email, user.password));
            }
            catch {
                setAuth(2);
            }
        })();
    });
    if(auth === 0) {
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
                            <p className="log-in-message">
                                Logging in as {user?.email ? user.email : ''}&nbsp;
                                <Button className="function-text">
                                    Not you?
                                </Button>
                            </p>
                            <div className="password-input">
                                <PasswordInput
                                    id="password"
                                    labelText="One-Time Password"
                                    value={user?.password ? user.password : ''}
                                    maxLength={6}
                                    readOnly={true}
                                />
                            </div>
                            <Button className="resend-button" kind="secondary" >
                                Resend OTP
                            </Button>
                            <Button renderIcon={ArrowRight} className="log-in-button">
                                Log in
                            </Button>
                        </Theme>
                    </div>
                </Content>
            </>
        );
    } else if(auth === 1) {
        return children;
    } else if(auth === 2) {
        return <Navigate to='/login'/>;
    }
};

export default PrivateRoute;
