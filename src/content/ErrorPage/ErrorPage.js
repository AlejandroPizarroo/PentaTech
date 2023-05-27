import React from 'react';
import {Link} from "react-router-dom";

const ErrorPage = () => {

    return (
        <section className='error-page'>
            <h2>404</h2>
            <p>Page not found</p>
            <Link to='/'>back home</Link>
        </section>
    )
}

export default ErrorPage;