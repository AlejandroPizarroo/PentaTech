import React, {useState} from 'react';
import {Header, HeaderName, Theme} from '@carbon/react';
import {Grid, Column, TextInput, Button} from '@carbon/react';
import {Link} from 'react-router-dom';
import {ArrowRight} from '@carbon/react/icons';

const formData = new URLSearchParams();
////const emailRegex = /^[\w.%+-]+@ibm\.com$/i;
const emailRegex = /^[\w.%+-]+@tec\.mx$/i;
const HomePage = () => {
    const [errorMessage, setErrorMessage] = useState('IBMid');
    const [inputValue, setInputValue] = useState('');
    const[pageDir, setPageDir] = useState('/login');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        if (emailRegex.test(event.target.value)) {
            formData.append('email', event.target.value) ;
            setPageDir("/dashboard");
        }
    };

    const handleButtonClick = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        };

        fetch('http://localhost:5000/api/auth/verifyEmail', requestOptions)
            .then(response => response.json())
            .then(_ =>{
                setErrorMessage('');
            })
            .catch(error => {
                console.error(error);
                setErrorMessage("Se ingreso un email inválido");
            });
    };


    return(
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
                <Column lg={{span: 8, offset: 4}} md={{span: 4, offset: 2}} sm={{span: 2, offset: 1}}>
                    <Theme theme="g100">
                        <h3>Log in to the IBM Certifications Dashboard</h3>
                        <TextInput
                            id="text-input-1"
                            type="email"
                            labelText={errorMessage || "IBMid"}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="username@ibm.com"
                        />
                        <Link to={pageDir}>
                            <Button renderIcon={ArrowRight} onClick={handleButtonClick}>Log in</Button>
                        </Link>
                    </Theme>
                </Column>
            </Grid>
        </Column>
    </Grid>
    </body>
    );

}

export default HomePage;