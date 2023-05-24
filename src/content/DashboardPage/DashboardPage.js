import React from 'react';
import {Theme, Header, HeaderName, HeaderGlobalBar, ExpandableSearch, OverflowMenu, OverflowMenuItem} from '@carbon/react';
import {User} from '@carbon/react/icons';
import {Content} from '@carbon/react';
import {Link} from 'react-router-dom';

const DashboardPage = () => (
    <>
        <Theme theme="g100">
            <Header aria-label="IBM Platform Name">
                <HeaderName prefix="IBM">
                    Certifications Dashboard
                </HeaderName>
                <HeaderGlobalBar>
                    <ExpandableSearch
                        size="lg"
                        placeholder="Search by Uid"
                        id="search-explandable-1"
                        onChange={() => {}}
                        onKeyDown={() => {}}
                    />
                    <OverflowMenu
                        aria-label="User"
                        flipped="true"
                        renderIcon={User}
                        size="lg">
                        <OverflowMenuItem itemText="Log out" href="/">
                            <Link to="/"/>
                        </OverflowMenuItem>
                    </OverflowMenu>
                </HeaderGlobalBar>
            </Header>
        </Theme>
        <Content>
            Dashboard page
        </Content>
    </>
)

export default DashboardPage;