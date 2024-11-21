import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate back
import './CreateContest.css'; // Importing CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { HandleError } from '../../utils';
import { useTheme } from '../Themes/Themes.jsx';
import { useNotification } from '../otherComponents/Notification/Notification.jsx';
import { useAuth } from '../Authentication/Authenticaton.jsx';
const CreateContest = () => {
    const [contestTitle, setContestTitle] = useState('');
    const [questions, setQuestions] = useState([
        {
            title: '',
            description: '',
            imageUrl: '',
            notes: '',
            constraints: '',
            testCases: [{ input: [], output: [] }],
            examples: [{ input: '', output: '' }] // Add examples field
        }
    ]);
    const { isDark } = useTheme();
    const [isLocked, setIsLocked] = useState(true); // Lock the page by default
    const [isAdmin, setIsAdmin] = useState(false); // Check if the user is an admin
    const navigate = useNavigate(); // To navigate back to the problem page
    const notify = useNotification();
    const { isAuthenticated } = useAuth(); 

 // const apiUrl = 'https://bcknd.codehub.org.in';
 const apiUrl='http://localhost:3000';
    // Unlock the page for admin
    const handleUnlock = () => {
        if (localStorage.getItem('key')) {
            setIsLocked(false);
        } else {
            console.log('not admin');
            // notify({
            //     title: "Success!",
            //     message: "This is a success message!",
            //     type: "success",
            //   });
            HandleError('Only admins can unlock the page', isDark);
        }
    };

    // Navigate back to problem page
    const handleBack = () => {
        navigate('/Problems'); // Replace '/problem' with the actual path to your problem page
    };

    // Add a new question
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                title: '',
                description: '',
                imageUrl: '',
                notes: '',
                constraints: '',
                testCases: [{ input: '', output: '' }],
                examples: [{ input: '', output: '' }] // Initialize examples for new question
            }
        ]);
    };

    // Remove a question (only if it's not the first question)
    const handleRemoveQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    // Update question fields
    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    // Update test case input/output for a specific question and test case
    const handleTestCaseChange = (questionIndex, testCaseIndex, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].testCases[testCaseIndex][field] = value;
        setQuestions(updatedQuestions);
    };

    // Update example input/output for a specific question and example
    const handleExampleChange = (questionIndex, exampleIndex, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].examples[exampleIndex][field] = value;
        setQuestions(updatedQuestions);
    };

    // Add a new test case to a specific question
    const handleAddTestCase = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].testCases.push({ input: '', output: '' });
        setQuestions(updatedQuestions);
    };

    // Add a new example to a specific question
    const handleAddExample = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].examples.push({ input: '', output: '' });
        setQuestions(updatedQuestions);
    };

    // Remove an example from a specific question
    const handleRemoveExample = (questionIndex, exampleIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].examples.splice(exampleIndex, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        const headers = {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        };
        console.log({ contestTitle, questions });
       
const userId= localStorage.getItem('userId');

        try {
            // const apiUrl = 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/NewContest`, {
                method: "POST",
                headers,
                body: JSON.stringify({contestTitle, questions, userId})
            });
            if (!response.ok) throw new Error('Failed to fetch profile data');
            const data = await response.json();
            const inputString= data.questions[0].testCases[0].input;
            let inputArray = JSON.parse(inputString);
            // console.log('data->',typeof data.questions[0].JSON.parse(testCases[0].input));
            console.log('data->', inputArray[0]);
            
        } catch (error) {
            console.error('Error fetching contest data:', error);
        // toast.error('Failed to fetch contest data');
        }
    };
    if (!isAuthenticated) {
        navigate('/login');
            // return <div>Please log in to access the compiler.</div>; // Change the message as needed
          }

    return (
        <div className="Contest-container">
            {isLocked && (
                <div className="lockOverlay">
                    <div className="lockMessage">
                        <FontAwesomeIcon icon={faLock} className="lockIcon" />
                        <h2>Page is locked!</h2>
                        <button onClick={handleUnlock} className="unlockButton">Unlock</button>
                        <button onClick={handleBack} className="backButton">Back</button>
                    </div>
                </div>
            )}

            {/* Contest Creation Form (Only visible if not locked) */}
            {!isLocked && (
                <>
                    <h1 className='create-contest'>Create a Contest</h1>
                    <label>
                        Contest Name:
                        <input
                            type="text"
                            value={contestTitle}
                            onChange={(e) => setContestTitle(e.target.value)}
                            className="contestname"
                            required
                        />
                    </label>

                    <form onSubmit={handleSubmit} className="form">
                        {questions.map((question, qIndex) => (
                            <div key={qIndex} className="questionBox">
                                <h2>Question {qIndex + 1}</h2>

                                <div className="inputGroup">
                                    <label>
                                        Title:
                                        <input
                                            type="text"
                                            value={question.title}
                                            onChange={(e) => handleQuestionChange(qIndex, 'title', e.target.value)}
                                            className="inputField"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="inputGroup">
                                    <label>
                                        Description:
                                        <textarea
                                            value={question.description}
                                            onChange={(e) => handleQuestionChange(qIndex, 'description', e.target.value)}
                                            className="textareaField"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="inputGroup">
                                    <label>
                                        Image/Diagram URL (Optional):
                                        <input
                                            type="text"
                                            value={question.imageUrl}
                                            onChange={(e) => handleQuestionChange(qIndex, 'imageUrl', e.target.value)}
                                            className="inputField"
                                            placeholder="Enter URL for an image/diagram"
                                        />
                                    </label>
                                </div>

                                <div className="inputGroup">
                                    <label>
                                        Notes:
                                        <textarea
                                            value={question.notes}
                                            onChange={(e) => handleQuestionChange(qIndex, 'notes', e.target.value)}
                                            className="textareaField"
                                            placeholder="Any additional notes for the problem"
                                        />
                                    </label>
                                </div>

                                <div className="inputGroup">
                                    <label>
                                        Constraints:
                                        <textarea
                                            value={question.constraints}
                                            onChange={(e) => handleQuestionChange(qIndex, 'constraints', e.target.value)}
                                            className="textareaField"
                                            placeholder="Enter constraints for the problem"
                                        />
                                    </label>
                                </div>

                                {/* Examples Section */}
                                <div className="examplesBox">
                                    <h3>Examples</h3>
                                    {question.examples.map((example, eIndex) => (
                                        <div key={eIndex} className="exampleInput">
                                            <label>
                                                Example Input:
                                                <textarea
                                                    value={example.input}
                                                    onChange={(e) => handleExampleChange(qIndex, eIndex, 'input', e.target.value)}
                                                    className="textareaField midSizeTextarea" // Add class for medium size
                                                    placeholder='Enter example input'
                                                    required
                                                />
                                            </label>

                                            <label>
                                                Example Output:
                                                <textarea
                                                    value={example.output}
                                                    onChange={(e) => handleExampleChange(qIndex, eIndex, 'output', e.target.value)}
                                                    className="textareaField midSizeTextarea" // Add class for medium size
                                                    placeholder='Enter example output'
                                                    required
                                                />
                                            </label>

                                            {/* Remove button for example */}
                                            <button type="button" onClick={() => handleRemoveExample(qIndex, eIndex)} className="removeExampleButton">
                                                Remove Example
                                            </button>
                                        </div>
                                    ))}

                                    <button type="button" onClick={() => handleAddExample(qIndex)} className="addExampleButton">
                                        Add Example
                                    </button>
                                </div>

                                {/* Test Cases Section */}
                                <div className="testCaseBox">
                                    <h3>Test Cases</h3>
                                    {question.testCases.map((testCase, tcIndex) => (
                                        <div key={tcIndex} className="testCases">
                                            <label>
                                                Input (JSON Array or String):
                                                <textarea
                                                    value={testCase.input}
                                                    onChange={(e) => handleTestCaseChange(qIndex, tcIndex, 'input', e.target.value)}
                                                    className="textareaField"
                                                    placeholder='Enter input (e.g., [{"data": 1}])'
                                                    required
                                                />
                                            </label>

                                            <label>
                                                Output (JSON Array or String):
                                                <textarea
                                                    value={testCase.output}
                                                    onChange={(e) => handleTestCaseChange(qIndex, tcIndex, 'output', e.target.value)}
                                                    className="textareaField"
                                                    placeholder='Enter output (e.g., [{"result": 1}])'
                                                    required
                                                />
                                            </label>

                                            {/* Remove button for test case */}
                                            {question.testCases.length > 1 && (
                                                <button type="button" onClick={() => handleRemoveTestCase(qIndex, tcIndex)} className="removeTestCaseButton">
                                                    Remove Test Case
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    {/* <button type="button" onClick={() => handleAddTestCase(qIndex)} className="addTestCaseButton">
                                        Add Test Case
                                    </button> */}
                                </div>

                                {/* Remove question button */}
                                {questions.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveQuestion(qIndex)} className="removeQuestionButton">
                                        Remove Question
                                    </button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={handleAddQuestion} className="addQuestionButton">
                            Add Question
                        </button>

                        <button type="submit" className="submitButton">Create Contest</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CreateContest;

