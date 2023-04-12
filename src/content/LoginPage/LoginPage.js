import React from 'react';
import  {Button, Header, HeaderName}  from 'carbon-components-react';
import {Link} from "react-router-dom";


const LoginPage = () => {
    return(
        <>
        <div>
            <Header aria-label="IBM Platform Name">
                    <HeaderName href="#" prefix="IBM">
                      Certifications Dashboard
                    </HeaderName>
            </Header>
        </div>
            <br/><br/>
        <div>
            <Link to="/searchpage">
                <Button>Continuar</Button>
            </Link>
        </div>
        </>
    );
};

export default LoginPage;