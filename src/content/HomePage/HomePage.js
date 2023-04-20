import React from 'react';
import {Header, HeaderName, HeaderGlobalBar, OverflowMenu, OverflowMenuItem} from '@carbon/react';
import {User} from '@carbon/react/icons';
import {Content, Button} from '@carbon/react';
import {Link} from 'react-router-dom';

const HomePage = () => (
    <>
        <Header aria-label="IBM Platform Name">
            <HeaderName prefix="IBM">
                Certifications Dashboard
            </HeaderName>
            <HeaderGlobalBar>
                <OverflowMenu
                    aria-label="User"
                    flipped="true"
                    renderIcon={User}
                    size="lg">
                    <OverflowMenuItem itemText="Log in" href="/login"/>
                </OverflowMenu>
            </HeaderGlobalBar>
        </Header>
        <Content>
            Home page
        </Content>
        <Content>
            <Link to="/login">
                <Button>Log in page</Button>
            </Link>
        </Content>
    </>
)

export default HomePage;