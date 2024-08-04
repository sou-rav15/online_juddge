// frontend/src/AddProblemPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AddProblemPage = () => {
    const [problem, setProblem] = useState({
        title: '',
        description: '',
        difficulty: '',
        tags: '',
        timeLimit: '',
        note: '',
        constraints: ''
    });

    const handleChange = (e) => {
        setProblem({ ...problem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/Problems', {
                ...problem,
                tags: problem.tags.split(',').map(tag => tag.trim()),
                constraints: problem.constraints.split('\n').map(constraint => constraint.trim())
            });
            console.log(problem)
            console.log('Problem added:', response.data);
            // Clear the form
            setProblem({
                title: '',
                description: '',
                difficulty: '',
                tags: '',
                timeLimit: '',
                note: '',
                constraints: ''
            });
        } catch (error) {
            console.error('Error adding problem:', error);
        }
    };

    return (
        <Container>
            <h1>Add a Problem</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={problem.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={problem.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="difficulty">
                            <Form.Label>Difficulty</Form.Label>
                            <Form.Control
                                as="select"
                                name="difficulty"
                                value={problem.difficulty}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control
                                type="text"
                                name="tags"
                                value={problem.tags}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">Comma-separated tags.</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="timeLimit">
                            <Form.Label>Time Limit (ms)</Form.Label>
                            <Form.Control
                                type="number"
                                name="timeLimit"
                                value={problem.timeLimit}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="note">
                            <Form.Label>Note</Form.Label>
                            <Form.Control
                                type="text"
                                name="note"
                                value={problem.note}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="constraints">
                            <Form.Label>Constraints</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="constraints"
                                value={problem.constraints}
                                onChange={handleChange}
                                required
                            />
                            <Form.Text className="text-muted">Separate each constraint by a newline.</Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Add Problem
                </Button>
            </Form>
        </Container>
    );
};

export default AddProblemPage;
