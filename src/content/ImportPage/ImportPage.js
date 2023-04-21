import React from 'react';
import {Theme, Header, HeaderName, HeaderNavigation, HeaderMenuItem, HeaderGlobalBar, ExpandableSearch, OverflowMenu, OverflowMenuItem} from '@carbon/react';
import {User} from '@carbon/react/icons';
import {Content} from '@carbon/react';
import {Link} from 'react-router-dom';

const ImportPage = () => (
    <>
        <Theme theme="g100">
            <Header aria-label="IBM Platform Name">
                <HeaderName prefix="IBM">
                    Certifications Dashboard
                </HeaderName>
                <HeaderNavigation aria-label="Carbon Tutorial">
                    <HeaderMenuItem element={Link} to="/dashboard">Dashboard</HeaderMenuItem>
                    <HeaderMenuItem element={Link} to="/import">Import data</HeaderMenuItem>
                </HeaderNavigation>
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
            Import page
        </Content>
    </>
)

export default ImportPage;