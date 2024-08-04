// ErrorPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ErrorPage = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="text-center">
                        <h1 className="display-1">404</h1>
                        <p className="lead">Oops! Page not found.</p>
                        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                        <Link to="/" className="btn btn-primary btn-lg mt-3">Go to Home</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ErrorPage;
