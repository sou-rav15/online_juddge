import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Authentication/Authenticaton'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './Update.css'
import { HandleError, HandleSuccess } from '../../utils';
import { useTheme } from '../Themes/Themes';
const AddTestCase = () => {
  const { isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isLocked, setIsLocked] = useState(true); // Lock the page by default
  const [isAdmin, setIsAdmin] = useState(false);
  const [output, setOutput] = useState('');
  const { id } = useParams();
  const { isDark } = useTheme();
   // const apiUrl = 'https://bcknd.codehub.org.in';
   const apiUrl='http://localhost:3000';
  // console.log('id->',id);
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

    const testCaseData = {
      input: JSON.parse(input),  // Assuming input is in JSON format
      // input: input,  // Assuming input is in JSON format
      expected_output: JSON.parse(output)
    };
// console.log('input is->',input);
// console.log('output is->',output);
// console.log('testcases',testCaseData);

    try {
      const response = await fetch(`${apiUrl}/Testcases/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCaseData),
      });
// console.log('response',response);
      if (!response.ok) {
        throw new Error('Failed to add test case');
      }

      const result = await response.json();
      // console.log('Test case added:', result);
const{success , error}=result;
      // Clear the input fields after successful submission
      
      setInput('');
      setOutput('');
      if(success){
        console.log('here');
        
        HandleSuccess('TestCases added to the database', isDark);
      }
      

    } catch (error) {
      // console.error('Error:', error);
    }
  };
  if (!isAuthenticated) {
   
    return <div>
      <p className='ms-2'>Invalid token , token is required to acces this resources, please login..</p>
    </div>; // Prevent rendering until navigation occurs
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
    <div className="container mt-4">
      <h3>Add Test Case</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="input" className="form-label texts">Input</label>
          <textarea
            id="input"
            rows="3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control"
            placeholder='Enter input as JSON (e.g., ["{Testcase1}", "{Testcase2}", "{Testcase3}"])'
          />
         <small className="form-text text">
  - Enter test cases in JSON format as an array of objects. Each object should represent a test case with key-value pairs.
  - Example: `[object1,object2]`Each objects represent each test case with key-value;
  - Ensure all keys are enclosed in double quotes and the format is valid JSON.
</small>
        </div>
        
        <div className="mb-3">
          <label htmlFor="output" className="form-label texts">Expected Output</label>
          <input
            id="output"
            type="text"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            className="form-control"
            placeholder='Enter expected output'
          />
         <small className="form-text text">
  - For a single number, use double quotes in square brackets, e.g., `["20","4"]`.
  - For an array of numbers, use double square brackets, e.g., `[[20, 3], [1, 4]]`.
  - For an array of strings, use double square brackets with each string in double quotes, e.g., `["string1", "string2"]`.
  - For a single string, use double quotes, e.g., `["Hello","hey","yeh"]`.
</small>
          <small className="form-text text-muted">
           Please send the data according to instructions... or else it will not stored 
          </small>
        </div>
        
        <button type="submit" className="add-example">Add TesCases</button>
      </form>
    </div>
  );
}; 
export default AddTestCase;


