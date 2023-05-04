import React from 'react';
import {Header, HeaderName, HeaderGlobalBar, OverflowMenu, OverflowMenuItem} from '@carbon/react';
import {User} from '@carbon/react/icons';
import {Content, Button} from '@carbon/react';
import {Link} from 'react-router-dom';
import ibmCertificationImg from './ibm-certification-logo.png';

const HomePage = () => (
    <>
        <Header aria-label="IBM Platform Name">
            <HeaderName prefix="IBM">
                Certifications Dashboard
            </HeaderName>
            <HeaderGlobalBar>
                <OverflowMenu
                    flipped="true"
                    renderIcon={User}
                    size="lg">
                    <OverflowMenuItem itemText="Log in" href="/login"/>
                </OverflowMenu>
            </HeaderGlobalBar>
        </Header>
        <Content>
            <h1 className="landing-page__heading">IBM Certifications Dashboard</h1>
            <h2 className="landing-page__subheading">What is IBM CD?</h2>
            <p className="landing-page__p">
                IBM Certifications dashboard is a platform that allows IBM to compare
                themselves against the rest of the industry. With filters, a search
                function, and a functional dashboard to display data, the information
                can be easily managed and compared so IBM can be the best in the industry.
            </p>
            <img
                className="landing-page__img"
                src={ibmCertificationImg}
                alt="IBM Certification logo"
            />
            <Link to="/login">
                <Button className="loginbutton">Log in page</Button>
            </Link>
            <h2 className="landing-page__subheadingFunc" id={"func1"}>The functionalities</h2>
            <h2 className="landing-page__subheadingFunc">Upload Information</h2>
            <p className="landing-page__p1">
                IBM Certifications dashboard is a platform that allows IBM to compare
                themselves against the rest of the industry. With filters, a search
                function, and a functional dashboard to display data, the information
                can be easily managed and compared so IBM can be the best in the industry.
            </p>
            <h2 className="landing-page__subheadingFunc">Filter and search for employees</h2>
            <p className="landing-page__p1">
                IBM CD allows you to save as many Excels as you require to easily make the
                comparisons you need. Just pick a name for the data set, choose the file you
                want to upload and select a second data set to start comparing.
            </p>
            <h2 className="landing-page__subheadingFunc">Visualize Information</h2>
            <p className="landing-page__p1">
                Any uploaded information will be displayed in an esthetic and intuitive
                way so that the data can be visually analyzed, therefore, when using either
                the filter and/or search functions the dashboard will update in real time.
            </p>


        </Content>
        <Content>

        </Content>

    </>
)

export default HomePage;