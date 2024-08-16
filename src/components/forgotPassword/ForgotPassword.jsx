// SecurityQuestionsPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './ForgotPassword.css'
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = 'https://bcknd.codehub.org.in';
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response= await axios.post(`${apiUrl}/forgotPassword`, { email, newPassword });
            setMessage('Password has been updated successfully.');
            setError('');
        } catch (err) {
            setError('Failed to update password. Please try again.');
            setMessage('');
        }
    };

    return (
        <Container>
            <h2>Reset Password</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="answer">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                    className='mb-3'
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <button className='forgot-button' type="submit">Reset Password</button>
            </Form>
            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Container>
    );
};

export default ForgotPassword;
