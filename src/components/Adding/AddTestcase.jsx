import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HandleError } from '../../utils';
import { ToastContainer} from 'react-toastify';

const AddTestCase = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { id } = useParams();
  // console.log('id->',id);
  // const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrl = 'https://backend.codehub.org.in';
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
          'accessKey':localStorage.getItem('key')
        },
        body: JSON.stringify(testCaseData),
      });if(!localStorage.getItem('key')){
              const data =await response.json();
console.log('response',data);
HandleError(data.message);
      }

      if (!response.ok) {
        throw new Error('Failed to add test case');
      }

      const result = await response.json();
      // console.log('Test case added:', result);

      // Clear the input fields after successful submission
      setInput('');
      setOutput('');
    } catch (error) {
      console.error('Error:', error);
      HandleError(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Test Case</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="input" className="form-label">Input</label>
          <textarea
            id="input"
            rows="3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control"
            placeholder='Enter input as JSON (e.g., ["1", "2", "3"])'
          />
         <small className="form-text text-muted">
  - Enter test cases in JSON format as an array of objects. Each object should represent a test case with key-value pairs.
  - Example: `[object1,object2]`Each objects represent each test case with key-value;
  - Ensure all keys are enclosed in double quotes and the format is valid JSON.
</small>
        </div>
        
        <div className="mb-3">
          <label htmlFor="output" className="form-label">Expected Output</label>
          <input
            id="output"
            type="text"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            className="form-control"
            placeholder='Enter expected output'
          />
         <small className="form-text text-muted">
  - For a single number, use double quotes in square brackets, e.g., `["20","4"]`.
  - For an array of numbers, use double square brackets, e.g., `[[20, 3], [1, 4]]`.
  - For an array of strings, use double square brackets with each string in double quotes, e.g., `["string1", "string2"]`.
  - For a single string, use double quotes, e.g., `["Hello","hey","yeh"]`.
</small>
          <small className="form-text text-muted">
           Please send the data according to instructions... or else it will not stored 
          </small>
        </div>
        
        <button type="submit" className="btn btn-primary">Add TestCases</button>
        
      </form><ToastContainer/> 
    </div>
  );
};



export default AddTestCase;


