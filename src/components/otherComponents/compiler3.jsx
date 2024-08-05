import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HandleError } from '../../utils';
import handleProblemSubmission from './SubmissionStatus';

const Compiler3 = ({ problemId }) => {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');


  const handleRunCode = () => {
    // Logic for running code (e.g., send code and input to backend)
    setOutput('Output will be displayed here.');
  };

  const handleSubmitCode = async (e) => {
    // Logic for submitting code (e.g., for assessment or storing solutions)

    // console.log(language, 'problemid',problemId,code);
    e.preventDefault()
    const payLoad = {
      problem_id: problemId,
      language,
      code
    };
    if (!code) {
      return HandleError("code is empty");
    }

    try {
      const url = "http://localhost:8000/CheckTestCases";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payLoad)

      })
      // console.log(response);

      const result = await response.json();
      // console.log('result is->',result);

      const Status = result.map((obj) => obj.status);
      const finalStatus = Status.every(state => state === 'Accepted') ? 'Accepted' : 'Not Accepted';
      const statusMessages = result.map((obj, index) => {
        return `Test Case ${index + 1}: ${obj.status}`;
      });
      // console.log('staus message->',Status)
      setOutput(statusMessages.join('\n'));

      handleProblemSubmission(problemId, finalStatus);

    } catch (error) {
      console.log(error);
    }
    //  console.log(code);

    // setOutput('Code submitted successfully.');
  };

  return (
    <div>
      {/* Language Selector */}
      <div className="mb-2">
        <select
          className="form-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          {/* <option value="java">Java</option> */}
        </select>
      </div>

      {/* Code Editor */}
      <div className="mb-2">
        <textarea
          className="form-control"
          rows="10"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        ></textarea>
      </div>

      {/* Input Area */}
      <div className="mb-2">
        <textarea
          className="form-control"
          rows="3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Input data (if any)..."
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="mb-2 d-flex justify-content-between">
        <button className="btn btn-success me-2" onClick={handleRunCode}>
          Run Code
        </button>
        <button className="btn btn-primary" onClick={handleSubmitCode}>
          Submit Code
        </button>
      </div>

      {/* Output Area */}
      <div className="border p-3 bg-light" style={{ minHeight: '100px' }}>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler3;
