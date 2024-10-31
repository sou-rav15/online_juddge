import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <Container className="error-container mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6} className="text-center">
                    <h1 className="display-1 error-code">404</h1>
                    <p className="lead error-message">Oops! We couldn’t find that page.</p>
                    <p className="error-description">
                        The page you are looking for might have been removed, renamed, or is temporarily unavailable. 
                        But don't worry, codeHub has plenty more to explore!
                    </p>
                    <Link to="/" className="btn btn-primary btn-lg error-btn mt-3">Return to Home</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ErrorPage;
