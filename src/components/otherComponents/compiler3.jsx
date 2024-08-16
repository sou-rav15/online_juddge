import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HandleError } from '../../utils';
import handleProblemSubmission from './SubmissionStatus';
import saveCodeToBackend from './CodeSave';
import { ToastContainer} from 'react-toastify';
import MonacoEditor from '@monaco-editor/react';

const Compiler3 = ({ problemId }) => {

  const languageMapping = {
    cpp: 'cpp',
    js: 'javascript',
    py: 'python',
    java: 'java'
  };

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
const userId= localStorage.getItem('userId')
// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = 'https://bcknd.codehub.org.in';
// code fethcing

useEffect(() => {
  // console.log('im here')
  const fetchSavedCode = async () => {
    try {
      const url = `${apiUrl}/codeSave/${userId}/${problemId}`; // Include userId
      const headers={
        headers:{
          'Authorization':localStorage.getItem('token')
        }
      }
      const response = await fetch(url,headers);
      const result = await response.json();
      if (result.code) {
        setCode(result.code); // Set the fetched code in the editor
      }
    } catch (error) {
      console.error('Error fetching saved code:', error);
    }
  };

  fetchSavedCode();
}, [problemId, userId]);

  const handleRunCode = async(e) => {
    // Logic for running code (e.g., send code and input to backend)

    e.preventDefault();
    // if(language==="Javascript") setLanguage('js');
// console.log('language is ->',language);
    const payLoad = {
      language,
      code,
      input // Include input in the payload
    };

    if (!code) {
      
      console.log('code is empty');
      return HandleError("Code is empty");
      
    }
// console.log("payLoad is->",payLoad)
    try {
      const url = `${apiUrl}/run`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payLoad)
      });

      const result = await response.json();
     
      console.log('result output',result.output);
      // console.log(' error',result.error.stderr)
      if(result.output){// this part is changed
        // console.log('here');
        
        setOutput(result.output);
      }
      else if(result.error&&result.error.stderr){
        setOutput(result.error.stderr)
      }
else{
  setOutput('something wrong check code and inputs again ,check if it is infinte loop')
}
    } catch (error) {
      console.log(error);
    }
    console.log(code);

    // setOutput('Output will be displayed here.');
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
      const url = `${apiUrl}/CheckTestCases2`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payLoad)

      })
      // console.log(response);

      const result = await response.json();
      console.log('result is->',result);

  
   const Status = result.map((obj) => obj.status);
      const finalStatus = Status.every(state => state === 'Accepted') ? 'Accepted' : 'Not Accepted';
      const statusMessages = result.map((obj, index) => {
        return `Test Case ${index + 1}: ${obj.status}`;

      });
    
      // console.log('staus message->',Status)
      setOutput(statusMessages.join('\n'));


      handleProblemSubmission(problemId, finalStatus);
      saveCodeToBackend(problemId,code);

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
          <option value="java">Java</option>
        </select>
      </div>

      {/* Code Editor */}
      <div className="mb-2">
      <MonacoEditor
                height="400px"
                language={languageMapping[language]} // Use mapped value
                value={code}
                theme="myCustomTheme"
                options={{
                  selectOnLineNumbers: true,
                  automaticLayout: true,
                  autoClosingBrackets: 'always',
                  fontSize: 14
                }}
                onChange={(value) => setCode(value)}
              />
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
        <button className="me-2 custom-button" onClick={handleRunCode}>
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
      <ToastContainer />
    </div>
    
  );
};

export default Compiler3;
