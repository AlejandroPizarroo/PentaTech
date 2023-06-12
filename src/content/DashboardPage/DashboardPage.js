import React, { useState } from 'react';
import { Theme, Header, HeaderName, HeaderGlobalBar, ExpandableSearch, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { Content, Column, Grid, Loading, Modal } from '@carbon/react';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell, FileUploaderDropContainer } from '@carbon/react';
import { User, Upload, Search } from '@carbon/react/icons';
import {useNavigate} from 'react-router-dom';
import { MeterChart, AreaChart, DonutChart, WordCloudChart } from "@carbon/charts-react";
import FormData from 'form-data';
import "@carbon/charts/styles.css";

const DashboardPage = ({ user, setUser }) => {

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };

    const navigate = useNavigate();
    const loginNavigate = () => {
        setUser();
        navigate("/");
    };

    const fetchFunction = (vari, set, type, endpoint) => {
        fetch('https://ibm-server.ddns.net/api/'+endpoint)
            .then(response => response.json())
            .then(res => {
                if(type === 'summary') {
                    set(res.count);
                } else if(type === 'update') {
                    set(res.date);
                } else {
                    if (type === 'meter') {
                        let total = 0;
                        for (let i in res) {
                            total += res[i].value;
                        }
                        setCertificationTotal(total);
                    }
                    if(res[0].group === '' || res[0].date === '') {
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
    const [certificationTotal, setCertificationTotal] = useState(0);
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

    const [searchUid, setSearchUid] = useState('');
    const [searching, setSearching] = useState(false);
    const [modalLabel, setModalLabel] = useState('');
    const [searchUidCertifications, setSearchUidCertifications] = useState('');
    const [searchUidRecommendations, setSearchUidRecommendations] = useState('');
    const certHeaders = ['Certification', 'Type', 'Issue Date'];
    const recHeaders = ['Certification', 'Percentage'];
    const searchFunction = (event) => {
        // Si se presiona enter mientras se tiene seleccionada la barra de búsqueda se define el valor en la barra como el valor de búsqueda
        if(event.key === 'Enter' && document.getElementById("expandable-search").value!=='') {
            setSearchUid(document.getElementById("expandable-search").value);
            // Se hace el GET de las certificaciones y recomendaciones del usuario escrito
            fetch('https://ibm-server.ddns.net/api/ibm/certifications/uid/'+document.getElementById("expandable-search").value)
                .then(response => response.json())
                .then(res => {
                    // Cuando se obtiene la información entones se despliega el overlay que indica que se está haciendo una búsqueda
                    setSearching(true);
                    if(res.length !== 0) {
                        // Si la búsqueda es exitosa entonces se separan y almacenan las recomendaciones, certificaciones e información laboral (ubicación y organización) del empleado
                        setModalLabel(res[0]["org"]+" / "+res[0]["work_location"]);
                        setSearchUidRecommendations(res[1]);
                        setSearchUidCertifications(res[2]);
                    } else {
                        // Si la búsqueda no es exitosa entonces se le indica al usuario que no se encontró información laboral del empleado
                        setModalLabel('');
                    }
                })
        }
    };

    const closeModal = () => {
        setSearching(false);
        setSearchUid('')
    };

    const [uploadData, setUploadData] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const uploadFunction = (event) => {
        // Cambiar de valor la variable que controla el overlay que indica al usuario que se está subiendo el archivo
        setUploading(true);
        const formData = new FormData();
        // Dependiendo del tipo de movimiento (arrastrar o seleccionar) se identifica el archivo a subirse
        if(event.dataTransfer) {
            formData.append('csv', event.dataTransfer.files[0]);
        } else {
            formData.append('csv', event.target.files[0]);
        }
        // Se hace el POST a la base de datos en MongoDB y se envía el archivo subido
        fetch('https://ibm-server.ddns.net/api/import/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((response) => {
                // Si el archivo se subió con exito se imprime el mensaje de retroalimentación
                setUploadMessage(response.message);
                // Si el archivo se subió con éxito se le deja de indicar al usuario que se está subiendo un archivo
                setUploading(false);
                // Se le indica a las variables que almacenan la información de las gráficas que tienen que volver a solicitar
                setUids('');
                setOrgs('');
                setLocations('');
                setCertifications('');
                setCertificationTypes('');
                setCertificationDates('');
                setCertificationOrgs('');
                setUidOrgs('');
                setCertificationLocations('');
                setUidLocations('');
                setIndustrySkills('');
                setIbmCertifications('');
                setLastUpdate('');
            })
            .catch(_ => {
                // Si el archivo no se subió con éxito se imprime el mensaje de retroalimentación
                setUploadMessage('Internal server error (Please try again later)');
                // Si el archivo no se subió con éxito se le deja de indicar al usuario que se está subiendo un archivo
                setUploading(false);
            })
    };

    const [lastUpdate, setLastUpdate] = useState('');
    if(!lastUpdate) {fetchFunction(lastUpdate, setLastUpdate, 'update', 'import/newest-update')}

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
                        {/*Barra de búsqueda expandible de la librería de @carbon/react*/}
                        <div className="expandable-search">
                            <ExpandableSearch
                                labelText=""
                                id="expandable-search"
                                renderIcon={() => <Search size={20} className="search-icon"/>}
                                size="lg"
                                placeholder="Search by Uid"
                                // Cada vez que se presiona una tecla se manda llamar la función searchFunction
                                onKeyDown={searchFunction}
                            />
                        </div>
                        {/*Si se está buscando un empleado y aún no se ha hecho el GET despliega el overlay que indica al usuario que se está cargando*/}
                        {searchUid ? (
                            // Si ya se hizo el GET entonces se despliega el modal
                            (searching) ? (
                                <Modal
                                    open
                                    // El modal se despliega cada vez que se hace el GET
                                    passiveModal={true}
                                    // El modal únicamente se cierra cuando se presiona la "X"
                                    preventCloseOnClickOutside={true}
                                    // Se despliega la id del empleado
                                    modalHeading={searchUid}
                                    // Se despliega la información laboral del empleado
                                    modalLabel={modalLabel}
                                    onRequestClose={closeModal}
                                >
                                    {/*Si la búsqueda encontró información del empleado que se buscó se generan dinámicamente las tablas en base a la cantidad de información que se recibió*/}
                                    {modalLabel ? (
                                        <>
                                            <h4 className="certifications-header">Certifications</h4>
                                            <Table size="md" useZebraStyles={false}>
                                                <TableHead>
                                                    <TableRow>
                                                        {certHeaders.map((header) => (
                                                            <TableHeader id={header.key} key={header}>
                                                                {header}
                                                            </TableHeader>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {searchUidCertifications.map((row) => (
                                                        <TableRow key={row.id}>
                                                            {Object.keys(row)
                                                                .map((key) => {
                                                                    return <TableCell key={key}>{row[key]}</TableCell>;
                                                                })}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            <h4 className="recommendations-header">Recommendations</h4>
                                            <Table size="md" useZebraStyles={false}>
                                                <TableHead>
                                                    <TableRow>
                                                        {recHeaders.map((header) => (
                                                            <TableHeader id={header.key} key={header}>
                                                                {header}
                                                            </TableHeader>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {searchUidRecommendations.map((row) => (
                                                        <TableRow key={row.id}>
                                                            {Object.keys(row)
                                                                .map((key) => {
                                                                    return <TableCell key={key}>{row[key]}</TableCell>;
                                                                })}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </>
                                    ):(
                                        // Si no se encontró información del empleado que se buscó entonces se le indica al usuario los criterios para una búsqueda exitosa en caso de que haya ocurrido un error
                                        <p>
                                            There is no information for the Uid "{searchUid}".
                                            Remember that valid Uids are 12-character sequences
                                            beginning with 9 digits and ending in "IBM".
                                        </p>
                                    )}
                                </Modal>
                            ):(<Loading/>)
                        ):(<></>)}
                        {/*Botón que controla el modal para subir archivos*/}
                        <OverflowMenu
                            // Cuando se presiona el botón cambia el valor de la variable uploadData
                            onClick={() => setUploadData(true)}
                            // Se utiliza el ícono de Upload de la libreria @carbon/react/icons
                            renderIcon={() => <Upload size={20} />}
                            size="lg"
                        />
                        <Theme theme="g100">
                            <Modal
                                passiveModal={true}
                                // Cuando la variable uploadData es verdadera (es decir se presiona el botón) se despliega el modal
                                open={uploadData}
                                size="xs"
                                modalHeading="Upload data"
                                // Se despliega la variable que almacena la última fecha de actualización de la base de datos
                                modalLabel={"Last update: " + lastUpdate}
                                // Únicamente se cierra el modal cuando el usuario da click a la "X"
                                preventCloseOnClickOutside={true}
                                onRequestClose={() => setUploadData(false)}>
                                {/*Existe un texto con un hipervínculo para descargar el formato en el cual se deben subir los archivos*/}
                                <a className="download-link" href="/IBM-Certifications-Dashboard-Template.csv" download="IBM-Certifications-Dashboard-Template.csv">Make sure to use this format.</a>
                                <div className="padding"/>
                                {/*Se le da al usuario un espacio para subir el archivo seleccionándolo o arrastrándolo*/}
                                {/*El espacio solo permite subir un único archivo .csv y se manda llamar la función uploadFunction*/}
                                <FileUploaderDropContainer
                                    accept={['.csv']}
                                    labelText="Drag and drop a CSV file here or click to upload"
                                    onAddFiles={uploadFunction}
                                    multiple={false}
                                />
                                {/*Si se está subiendo un archivo se despliega el overlay que indica al usuario que se está cargando*/}
                                {uploading && <Loading/>}
                                {/*Si ya se subió un archivo se le indica al usuario el status de la operación*/}
                                {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
                            </Modal>
                        </Theme>
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
                            {user ? (
                                <>
                                    <h5 className="greeting-hello">Hello,&nbsp;</h5>
                                    <h5 className="greeting-user">{user?.email}</h5>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-column" lg={2} md={2} sm={1}>
                            {uids ? (
                                <>
                                    <h5>Unique Uids</h5>
                                    <h5 className="summary">{uids}</h5>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-column" lg={2} md={2} sm={1}>
                            {orgs ? (
                                <>
                                    <h5>Unique Orgs</h5>
                                    <h1 className="summary">{orgs}</h1>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-column" lg={2} md={2} sm={1}>
                            {locations ? (
                                <>
                                    <h5>Unique Locations</h5>
                                    <h1 className="summary">{locations}</h1>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-column" lg={2} md={2} sm={1}>
                            {certifications ? (
                                <>
                                    <h5>Unique Certifications</h5>
                                    <h1 className="summary">{certifications}</h1>
                                </>
                            ) : (<Loading withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={8} md={8} sm={4}>
                            {certificationTypes ? (
                                <>
                                    <MeterChart
                                        data={certificationTypes}
                                        options={certificationTypesOptions}>
                                    </MeterChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={8} md={8} sm={4}>
                            {certificationDates ? (
                                <>
                                    <AreaChart
                                        data={certificationDates}
                                        options={certificationDatesOptions}>
                                    </AreaChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={4} md={4} sm={2}>
                            {certificationOrgs ? (
                                <>
                                    <DonutChart
                                        data={certificationOrgs}
                                        options={certificationOrgsOptions}>
                                    </DonutChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={4} md={4} sm={2}>
                            {uidOrgs ? (
                                <>
                                    <DonutChart
                                        data={uidOrgs}
                                        options={uidOrgsOptions}>
                                    </DonutChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={4} md={4} sm={2}>
                            {certificationLocations ? (
                                <>
                                    <DonutChart
                                        data={certificationLocations}
                                        options={certificationLocationsOptions}>
                                    </DonutChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={4} md={4} sm={2}>
                            {uidLocations ? (
                                <>
                                    <DonutChart
                                        data={uidLocations}
                                        options={uidLocationsOptions}>
                                    </DonutChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={8} md={8} sm={4}>
                            {industrySkills ? (
                                <>
                                    <WordCloudChart
                                        data={industrySkills}
                                        options={industrySkillsOptions}>
                                    </WordCloudChart>
                                </>
                            ) : (<Loading className="loading" withOverlay={false} small={true} />)}
                        </Column>
                        <Column className="grid-graph" lg={8} md={8} sm={4}>
                            {ibmCertifications ? (
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