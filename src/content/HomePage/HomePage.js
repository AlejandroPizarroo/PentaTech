import React from 'react';
import {Theme, Header, HeaderName, HeaderGlobalBar, OverflowMenu, OverflowMenuItem} from '@carbon/react';
import {Content, Grid, Column, Button} from '@carbon/react';
import {User, Upload, Filter, Search} from '@carbon/react/icons';
import homeImage from './homePageImage.jpg';
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    const loginNavigate = () => {
        navigate("/login");
    };

    return (
        <>
            <Theme theme="g100">
                <Header aria-label="IBM Platform Name">
                    <HeaderName prefix="IBM" >
                        Certifications Dashboard
                    </HeaderName>
                    <HeaderGlobalBar>
                        <OverflowMenu
                            flipped={true}
                            renderIcon={() => <User size={20}/>}
                            size="lg">
                            <OverflowMenuItem onClick={loginNavigate} itemText="Log in" className="overflow-menu-item"/>
                        </OverflowMenu>
                    </HeaderGlobalBar>
                </Header>
            </Theme>
            <Content>
                <Grid className="banner">
                    <Column lg={8} md={4} sm={4} className="header">
                        <h1>Your one-stop certifications hub</h1>
                        <p className="header-body">
                            The IBM Certifications Dashboard allows IBM to compare their employees against
                            the rest of the industry using an interactive dashboard to upload, filter,
                            and search all important information through one single platform.
                        </p>
                            <Button onClick={loginNavigate}>Log in</Button>
                    </Column>
                    <Column lg={8} md={4} sm={4}>
                        <img src={homeImage} alt="Interior of a Summit node" className="home-image"/>
                    </Column>
                </Grid>
                <Grid className="info">
                    <Column lg={4} md={4} sm={4} className="info-title">
                        <h1>IBM CD</h1>
                    </Column>
                    <Column lg={4} md={4} sm={4} className="info-column">
                        <h3>Upload</h3>
                        <p className="info-body">
                            Store your certification information in the cloud for other employees to access.
                        </p>
                        <Upload size={32} />
                    </Column>
                    <Column lg={4} md={4} sm={4} className="info-column">
                        <h3>Filter</h3>
                        <p className="info-body">
                            Visualize and control employee data with an interactive dashboard and menu.
                        </p>
                        <Filter size={32} />
                    </Column>
                    <Column lg={4} md={4} sm={4} className="info-column">
                        <h3>Search</h3>
                        <p className="info-body">
                            Receive recommendations for each employee with artificial intelligence.
                        </p>
                        <Search size={32} />
                    </Column>
                </Grid>
            </Content>
        </>
    )
}

export default HomePage;