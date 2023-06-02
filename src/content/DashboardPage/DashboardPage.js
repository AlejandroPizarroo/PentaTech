import React, { useState } from 'react';
import {
    Theme,
    Header,
    HeaderName,
    HeaderGlobalBar,
    ExpandableSearch,
    OverflowMenu,
    OverflowMenuItem,
    Column, Grid, Loading
} from '@carbon/react';
import { Content, Modal } from '@carbon/react';
import { User, Upload, Search } from '@carbon/react/icons';
import {useNavigate} from 'react-router-dom';
import ReactDOM from 'react-dom'
import { MeterChart, AreaChart, DonutChart, WordCloudChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

const DashboardPage = ({ user, setUser }) => {

    const [certificationTotal, setCertificationTotal] = useState(0);

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };

    const navigate = useNavigate();
    const loginNavigate = () => {
        setUser();
        navigate("/");
    };

    const [open, setOpen] = useState(false);
    const ModalStateManager = ({renderLauncher: LauncherContent,
                                   children: ModalContent}) => {
        return (
            <>
                {!ModalContent || typeof document === 'undefined' ? null :
                    ReactDOM.createPortal(<ModalContent open={open} setOpen={setOpen} />, document.body)}
                {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
            </>
        );
    };

    const [searchUid, setSearchUid] = useState('');
    const searchFunction = () => {
        if(document.getElementById("expandable-search").value.length === 12) {
            setSearchUid(document.getElementById("expandable-search").value);
            setOpen(true);
        }
    };

    const fetchFunction = (vari, set, type, endpoint) => {
        fetch('http://localhost:5000/api/'+endpoint)
            .then(response => response.json())
            .then((res) => {
                if(type === 'summary') {
                    set(res.count);
                } else {
                    if(type === 'meter') {
                        let total = 0;
                        for(let i in res) {
                            total += res[i].value;
                        }
                        setCertificationTotal(total);
                    }
                    if(res[0].group === null || res[0].date === null) {
                        set(res.splice(1, res.length));
                    } else {
                        set(res);
                    }
                }
            });
    };

    const [uids, setUids] = useState('');
    if(!uids) {fetchFunction(uids, setUids, 'summary', 'ibm/certifications/num/uid')}

    const [orgs, setOrgs] = useState('');
    if(!orgs) {fetchFunction(orgs, setOrgs, 'summary', 'ibm/certifications/num/org')}

    const [locations, setLocations] = useState('');
    if(!locations) {fetchFunction(locations, setLocations, 'summary', 'ibm/certifications/num/work_location')}

    const [certifications, setCertifications] = useState('');
    if(!certifications) {fetchFunction(certifications, setCertifications, 'summary', 'ibm/certifications/num/certification')}

    const [certificationTypes, setCertificationTypes] = useState('');
    if(!certificationTypes) {fetchFunction(certificationTypes, setCertificationTypes, 'meter', 'ibm/certifications/badges/sorted')}
    const certificationTypesOptions = {
        "title": "Certifications by Type",
        "meter": {"proportional": {"total": certificationTotal, "unit": "certifications"}},
        "color": { "pairing": { "option": 3 } },
        "legend": {"alignment": "center"},
        "height": "200px",
        "theme": "g100"
    };

    const [certificationDates, setCertificationDates] = useState('');
    if(!certificationDates) {fetchFunction(certificationDates, setCertificationDates, 'area', 'ibm/certifications/count/stock/date')}
    const certificationDatesOptions = {
        "title": "Certifications by Date",
        "height": "200px",
        "grid": {"x": {"enabled": false}, "y": {"enabled": false}},
        "axes": {"bottom": {"visible": true, "title": "Date", "mapsTo": "date", "scaleType": "time"},
            "left": {"visible": false, "title": "Amount", "mapsTo": "value", "scaleType": "linear"}},
        "color": {"gradient": {"enabled": false}, "pairing": { "option": 3 }},
        "points": {"enabled": false},
        "legend": {"enabled": false},
        "theme": "g100"
    };

    const [certificationOrgs, setCertificationOrgs] = useState('');
    if(!certificationOrgs) {fetchFunction(certificationOrgs, setCertificationOrgs, 'donut', 'ibm/certifications/by/org')}
    const certificationOrgsOptions = {
        "title": "Certifications by Org",
        "donut": { "center": { "label": "Certifications"}, "alignment": "center" },
        "color": { "pairing": { "option": 1 } },
        "legend": { "alignment": "center" },
        "resizable": true,
        "height": "400px",
        "theme": "g100"
    };

    const [uidOrgs, setUidOrgs] = useState('');
    if(!uidOrgs) {fetchFunction(uidOrgs, setUidOrgs, 'donut', 'ibm/uids/by/org')}
    const uidOrgsOptions = {
        "title": "Uids by Org",
        "donut": { "center": { "label": "Uids"}, "alignment": "center" },
        "color": { "pairing": { "option": 1 } },
        "legend": { "alignment": "center" },
        "resizable": true,
        "height": "400px",
        "theme": "g100"
    };

    const [certificationLocations, setCertificationLocations] = useState('');
    if(!certificationLocations) {fetchFunction(certificationLocations, setCertificationLocations, 'donut', 'ibm/certifications/by/location')}
    const certificationLocationsOptions = {
        "title": "Certifications by Location",
        "donut": { "center": { "label": "Certifications"}, "alignment": "center" },
        "color": { "pairing": { "option": 2 } },
        "legend": { "alignment": "center" },
        "resizable": true,
        "height": "400px",
        "theme": "g100"
    };

    const [uidLocations, setUidLocations] = useState('');
    if(!uidLocations) {fetchFunction(uidLocations, setUidLocations, 'donut', 'ibm/uids/by/location')}
    const uidLocationsOptions = {
        "title": "Uids by Location",
        "donut": { "center": { "label": "Uids"}, "alignment": "center" },
        "color": { "pairing": { "option": 2 } },
        "legend": { "alignment": "center" },
        "resizable": true,
        "height": "400px",
        "theme": "g100"
    };

    const [industrySkills, setIndustrySkills] = useState('');
    if(!industrySkills) {fetchFunction(industrySkills, setIndustrySkills, 'word-cloud', 'udemy/popular/count/name')}
    const industrySkillsOptions  = {
        "title": "Popular Industry Skills",
        "color": {"pairing": {"option": 1}},
        "legend": {"enabled": false},
        "resizable": true,
        "height": "500px",
        "theme": "g100"
    };

    const [ibmCertifications, setIbmCertifications] = useState('');
    if(!ibmCertifications) {fetchFunction(ibmCertifications, setIbmCertifications, 'word-cloud', 'ibm/certifications/cloud/certification')}
    const ibmCertificationsOptions  = {
        "title": "Popular IBM Certifications",
        "color": {"pairing": {"option": 1}},
        "legend": {"enabled": false},
        "resizable": true,
        "height": "500px",
        "theme": "g100"
    };

    return (
        <>
            <script>
                window.history.forward();
            </script>
            <Theme theme="g100">
                <Header aria-label="IBM Platform Name">
                    <HeaderName prefix="IBM">
                        <span style={{ fontWeight: 'bold' }}>Certifications Dashboard</span>
                    </HeaderName>
                    <HeaderGlobalBar>
                        <div className="expandable-search">
                            <ModalStateManager
                                renderLauncher={({ setOpen }) => (
                                    <ExpandableSearch
                                        labelText=""
                                        id="expandable-search"
                                        renderIcon={() => <Search size={20} className="search-icon"/>}
                                        size="lg"
                                        placeholder="Search by Uid"
                                        onChange={searchFunction}
                                    />
                                )}>
                                {({ open, setOpen }) => (
                                    <Theme theme="g100">
                                        <Modal
                                            passiveModal
                                            modalHeading={searchUid}
                                            modalLabel="Finance and Operations - Guadalajara, JAL, Mexico"
                                            open={open}
                                            onRequestClose={() => setOpen(false)}>
                                            {/*<p>*/}
                                            {/*    Custom domains direct requests for your apps in this Cloud Foundry*/}
                                            {/*    organization to a URL that you own. A custom domain can be a shared*/}
                                            {/*    domain, a shared subdomain, or a shared domain and host.*/}
                                            {/*</p>*/}
                                        </Modal>
                                    </Theme>
                                )}
                            </ModalStateManager>
                        </div>
                        <OverflowMenu
                            renderIcon={() => <Upload size={20} />}
                            size="lg"
                            onClick={() => setOpen(true)}/>
                        <OverflowMenu
                            flipped={true}
                            renderIcon={() => <User size={20}/>}
                            size="lg">
                            <OverflowMenuItem onClick={loginNavigate} itemText="Log out" className="overflow-menu-item"/>
                        </OverflowMenu>
                    </HeaderGlobalBar>
                </Header>
            </Theme>
            <Theme theme="g100">
                <Content className="background">
                    <Grid condensed>
                        <Column className="greeting" lg={8} md={8} sm={4}>
                            {(user) ? (
                                <>
                                    <h5 className="greeting-hello">Hello,&nbsp;</h5>
                                    <h5 className="greeting-user">{user?.email}</h5>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-column" lg={2} md={2} sm={1}>
                            {(uids) ? (
                                <>
                                    <h5>Unique Uids</h5>
                                    <h5 className="summary">{uids}</h5>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-column" lg={2} md={2} sm={1}>
                            {(orgs) ? (
                                <>
                                    <h5>Unique Orgs</h5>
                                    <h1 className="summary">{orgs}</h1>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-column" lg={2} md={2} sm={1}>
                            {(locations) ? (
                                <>
                                    <h5>Unique Locations</h5>
                                    <h1 className="summary">{locations}</h1>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-column" lg={2} md={2} sm={1}>
                            {(certifications) ? (
                                <>
                                    <h5>Unique Certifications</h5>
                                    <h1 className="summary">{certifications}</h1>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={8} md={8} sm={4}>
                            {(certificationTypes) ? (
                                <>
                                    <MeterChart
                                        data={certificationTypes}
                                        options={certificationTypesOptions}>
                                    </MeterChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={8} md={8} sm={4}>
                            {(certificationDates) ? (
                                <>
                                    <AreaChart
                                        data={certificationDates}
                                        options={certificationDatesOptions}>
                                    </AreaChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={4} md={4} sm={2}>
                            {(certificationOrgs) ? (
                                <>
                                    <DonutChart
                                        data={certificationOrgs}
                                        options={certificationOrgsOptions}>
                                    </DonutChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={4} md={4} sm={2}>
                            {(uidOrgs) ? (
                                <>
                                    <DonutChart
                                        data={uidOrgs}
                                        options={uidOrgsOptions}>
                                    </DonutChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={4} md={4} sm={2}>
                            {(certificationLocations) ? (
                                <>
                                    <DonutChart
                                        data={certificationLocations}
                                        options={certificationLocationsOptions}>
                                    </DonutChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={4} md={4} sm={2}>
                            {(uidLocations) ? (
                                <>
                                    <DonutChart
                                        data={uidLocations}
                                        options={uidLocationsOptions}>
                                    </DonutChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={8} md={8} sm={4}>
                            {(industrySkills) ? (
                                <>
                                    <WordCloudChart
                                        data={industrySkills}
                                        options={industrySkillsOptions}>
                                    </WordCloudChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={8} md={8} sm={4}>
                            {(ibmCertifications) ? (
                                <>
                                    <WordCloudChart
                                        data={ibmCertifications}
                                        options={ibmCertificationsOptions}>
                                    </WordCloudChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                    </Grid>
                </Content>
            </Theme>
        </>
    );
};

export default DashboardPage;
