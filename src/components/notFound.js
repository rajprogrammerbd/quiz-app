import React from 'react';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <h3>Sorry, Not Found, go back to <Link to="/">Home</Link></h3>
        </>
    );
}

export default NotFound;