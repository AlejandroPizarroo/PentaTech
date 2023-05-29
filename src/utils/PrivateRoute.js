import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const otpVerification = (password) => {
    return new Promise((resolve) => {
        fetch(`http://localhost:5000/api/login/requestOtpVerification/${password}`)
            .then(response => response.json())
            .then((res) => {
                if(res.success) {
                    resolve(1);
                }
                resolve(2);
            })
            .catch(_ => {
                resolve(2);
            });
        setTimeout(() => resolve(2), 1000)
    })
}

const PrivateRoute = ({children, user}) => {
    const [auth, setAuth] = useState(0);
    useEffect(() => {
        (async function() {
            try {
                setAuth(await otpVerification(user.password));
            }
            catch {
                setAuth(2);
            }
        })();
    });
    if(auth === 0) {
        return <></>
    } else if(auth === 1) {
        return children;
    } else if(auth === 2) {
        return <Navigate to='/login'/>;
    }
};

export default PrivateRoute;
