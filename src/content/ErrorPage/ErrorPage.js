import React from 'react';
import tucaEnojado from './tuca-enojado.gif';
import { Button } from '@carbon/react';
import { useNavigate} from "react-router-dom";
const ErrorPage = () => {

    const navigate = useNavigate();

    const loginNavigate = () => {
        navigate("/");
    };

    return (
        <section className='error-page'>
            <h1 className='text-spacing'>IBM Certifications Dashboard</h1>
            <h2 className='text-spacing'>Error 404: Page not found</h2>
            <img className="error-image" src={tucaEnojado} alt="Ricardo 'Tuca' Ferretti"/>
            <p></p>
            <Button className='button' onClick={loginNavigate}>Return to Home Page</Button>
        </section>
    )
}

export default ErrorPage;