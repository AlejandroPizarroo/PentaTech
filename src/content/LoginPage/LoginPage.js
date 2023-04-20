import React from 'react';
import {Header, HeaderName, Theme} from '@carbon/react';
import {Grid, Column, TextInput, Button} from '@carbon/react';
import {Link} from 'react-router-dom';
import {ArrowRight} from '@carbon/react/icons';

const HomePage = () => (
    <body className="login-background">
        <Theme theme="g100">
            <Header aria-label="IBM Platform Name">
                <HeaderName prefix="IBM">
                    Certifications Dashboard
                </HeaderName>
            </Header>
        </Theme>
        <Grid fullWidth condensed>
            <Column lg={16} md={8} sm={4} className="upper-break"/>
            <Column lg={16} md={8} sm={4}>
                <Grid fullWidth condensed>
                    <Column lg={{span: 8, offset: 4}} md={{span:4, offset: 2}} sm={{span:2, offset: 1}}>
                        <Theme theme="g100">
                            <h3>Log in to the IBM Certifications Dashboard</h3>
                            <TextInput
                                id="text-input-1"
                                type="email"
                                labelText="IBMid"
                                placeholder="username@example.com"
                            />
                            <Link to="/dashboard">
                                <Button renderIcon={ArrowRight}>Log in</Button>
                            </Link>
                        </Theme>
                    </Column>
                </Grid>
            </Column>
        </Grid>
    </body>
)

export default HomePage;