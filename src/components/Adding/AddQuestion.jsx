
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Authentication/Authenticaton'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './Update.css';
import { HandleError, HandleSuccess } from '../../utils';
import { useTheme } from '../Themes/Themes';

const AddProblemPage = () => {
    const { isAuthenticated } = useAuth(); 
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [isLocked, setIsLocked] = useState(true); // Lock the page by default
    const [isAdmin, setIsAdmin] = useState(false);
    const [problem, setProblem] = useState({
        title: '',
        description: '',
        difficulty: '',
        tags: '',
        timeLimit: '',
        note: '',
        constraints: '',
        examples: [{ input: '', output: '', explanation: '' }]
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
     // const apiUrl = 'https://bcknd.codehub.org.in';
   const apiUrl='http://localhost:3000';
    const handleChange = (e) => {
        setProblem({ ...problem, [e.target.name]: e.target.value });
    };

    const handleExampleChange = (index, e) => {
        const updatedExamples = problem.examples.map((example, i) => 
            i === index ? { ...example, [e.target.name]: e.target.value } : example
        );
        setProblem({ ...problem, examples: updatedExamples });
    };

    const addExample = () => {
        setProblem({
            ...problem,
            examples: [...problem.examples, { input: '', output: '', explanation: '' }]
        });
    };

    const removeExample = (index) => {
        setProblem({
            ...problem,
            examples: problem.examples.filter((_, i) => i !== index)
        });
    };
    useEffect(()=>{},[isLocked]);
    const handleUnlock = () => {
        if (localStorage.getItem('key')) {
            setIsLocked(false);
        } else {
            console.log('not admin');
           
            HandleError('Only admin can unlock the page',isDark);
        }
    };
    const handleBack = () => {
        navigate('/Problems'); // Replace '/problem' with the actual path to your problem page
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            const response = await axios.post(`${apiUrl}/Problems`, {
                ...problem,
                tags: problem.tags.split(',').map(tag => tag.trim()),
                constraints: problem.constraints.split('\n').map(constraint => constraint.trim())
            });
            HandleSuccess('Problem added successfully!',isDark);
            setProblem({
                title: '',
                description: '',
                difficulty: '',
                tags: '',
                timeLimit: '',
                note: '',
                constraints: '',
                examples: [{ input: '', output: '', explanation: '' }]
            });
        } catch (error) {
            HandleError('Error adding problem: ' + (error.response?.data?.message || error.message),isDark);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if(isLocked){
        return(<>
         <div className="lockOverlay">
        <div className="lockMessage">
            <FontAwesomeIcon icon={faLock} className="lockIcon" />
            <h2>Page is locked!</h2>
            <button onClick={handleUnlock} className="unlockButton">Unlock</button>
            <button onClick={handleBack} className="backButton">Back</button>
        </div>
    </div>
        </>
       
        )
    }


    return (
        <Container>
            <h1 className='heading'>Add a Problem</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label className='texts'>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={problem.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label className='texts'>Description</Form.Label>
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
                            <Form.Label className='texts'>Difficulty</Form.Label>
                            <Form.Control
                                as="select"
                                name="difficulty"
                                className='texts'
                                value={problem.difficulty}
                                onChange={handleChange}
                                required
                            >
                                <option className="text"value="">Select Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="tags">
                            <Form.Label className='texts'> Tags</Form.Label>
                            <Form.Control
                                type="text"
                                name="tags"
                                value={problem.tags}
                                onChange={handleChange}
                            />
                            <Form.Text className="text">Comma-separated tags.</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="timeLimit">
                            <Form.Label className='texts'>Time Limit (ms)</Form.Label>
                            <Form.Control
                                type="number"
                                name="timeLimit"
                                value={problem.timeLimit}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="note">
                            <Form.Label className='texts'>Note</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={3}
                                type="text"
                                name="note"
                                value={problem.note}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="constraints">
                            <Form.Label className='texts'>Constraints</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="constraints"
                                value={problem.constraints}
                                onChange={handleChange}
                                required
                            />
                            <Form.Text className="text">Separate each constraint by a newline.</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="examples">
                            <Form.Label className='texts'>Examples</Form.Label>
                            {problem.examples.map((example, index) => (
                                <div key={index} className="mb-3">
                                    <Form.Control
                                        className='mb-2'
                                        as="textarea"
                                        rows={2}
                                        name="input"
                                        placeholder="Input"
                                        value={example.input}
                                        onChange={(e) => handleExampleChange(index, e)}
                                    />
                                    <Form.Control
                                        className='mb-2'
                                        as="textarea"
                                        rows={2}
                                        name="output"
                                        placeholder="Output"
                                        value={example.output}
                                        onChange={(e) => handleExampleChange(index, e)}
                                    />
                                    <Form.Control
                                        className='mb-2'
                                        as="textarea"
                                        rows={2}
                                        name="explanation"
                                        placeholder="Explanation"
                                        value={example.explanation}
                                        onChange={(e) => handleExampleChange(index, e)}
                                    />
                                    <button className="remove-button" onClick={() => removeExample(index)}>
                                        Remove Example
                                    </button>
                                </div>
                            ))}
                            <button className="add-example" onClick={addExample}>
                                Add Example
                            </button>
                        </Form.Group>
                    </Col>
                </Row>
                <button className="update-problem" type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Problem'}
                </button>
            </Form>
        </Container>
    );
};

export default AddProblemPage;
