import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HandleError } from '../../utils';
// import handleProblemSubmission from './Submission/Submission.jsx';
import handleProblemSubmission from './SubmissionStatus';
import MonacoEditor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import saveCodeToBackend from './CodeSave';
import Loader from './Loading/Loading.jsx';
import LoaderSmall from './Loading/LoadingSmall.jsx';
import './Compiler.css'
const Compiler3 = ({ problemId }) => {
  const [language, setLanguage] = useState('cpp');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
 
  // const apiUrl = 'https://bcknd.codehub.org.in';
  const apiUrl='http://localhost:3000';
  const languageMapping = {
    cpp: 'cpp',
    js: 'javascript',
    py: 'python',
    java: 'java',
    C:'C'
  };
  const userId= localStorage.getItem('userId');
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
    setLoading(true);
    const payLoad = {
      language,
      code,
      input,
    };

    if (!code) {
      return alert('Code is empty');
    }

    try {
      const url = `${apiUrl}/run`; // Replace with your actual URL
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      });

      const result = await response.json();
      console.log('response->', response);
      
      if (result.output) {
        setOutput(result.output);
      } else {
        setOutput(result.error.stderr ? result.error.stderr : result.error.error?result.error.error:result.error||"Unknown error please check code and try again");

      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);  // Set loading to false after result is received
    }
    // setOutput('Output will be displayed here.');
  };

  const handleSubmitCode = async(e) => {
  e.preventDefault();
  setLoading(true);
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
      // console.log('result is->',result.error);
     
      
  //     function extractRelevantError(compileError) {
  //       // Adjusting the pattern for Windows path, line numbers, and the error message
  //       // const errorPattern = /([a-zA-Z]:.*?\.cpp:\d+:\d+):\s*(error:.*?)\r?\n\s*(.+)/;
  //       const errorPattern = /([^\\]+\.cpp)(.*)/s;
  // const match = compileError.match(errorPattern);

  // if (match) {
  //   return `${match[1]}${match[2]}`.trim(); // Remove extra whitespace/newlines
  // } else {
  //   return "No relevant error found";
  // }
  //     }
      
  //     const relevantError = extractRelevantError(compileError);
  //     console.log(relevantError);
      
      
  if(result.error){
    console.log(result);
    setOutput(result.error.stderr||result.error.error||result.error||'An unknown error occured');
    return;
  }
   const Status = result.map((obj) => obj.status);
   console.log('status->',Status);
   
      const finalStatus = Status.every(state => state === 'Accepted') ? 'Accepted' : 'Not Accepted';
      console.log('finalStatus->', finalStatus);
    
      if(result[0].status==="Error"||Status[0]==="Error"){
        console.log('in error');
        const isEmptyObject = (obj) => {
          return Object.keys(obj).length === 0;
      };
      // const relevantError = extractRelevantError(result[0].errorMessage);
      if(isEmptyObject(result[0].errorMessage)){
        setOutput("An unexpected error occurred.");
        return ;
      }
      if(result.error){
        setOutput(result.error.stderr ? result.error.stderr : result.error.error?result.error.error:result.error||"Unknown error please check code and try again");
        return;
      }
        setOutput(result[0].errorMessage?result[0].errorMessage:'an error occured');
        return;
        console.log('not returned');
        
         
      }
      const statusMessages = result.map((obj, index) => {
        return `Test Case ${index + 1}: ${obj.status}`;
   
         });
         console.log('statusMessages->',statusMessages);
         
      
      
      // console.log('staus message->',Status)
      setOutput(statusMessages.join('\n'));


      handleProblemSubmission(problemId, finalStatus);
      saveCodeToBackend(problemId,code);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);  // Set loading to false after result is received
    }
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
          <option value="C">C</option>
          <option value="py">Python</option>
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
        <button className="custom-button" onClick={handleRunCode}>
          Run Code
        </button>
        <button className="submit-button" onClick={handleSubmitCode}>
          Submit Code
        </button>
      </div>

      {/* Output Area */}
      <div className=" p-3 bg-light output-container " style={{ minHeight: '100px', fontSize:'14px'}}>
    { loading?<LoaderSmall/>:( <pre className='output'>{output}</pre>
      )}
        {/* <pre className='output'>{loading?(<LoaderSmall/>):output}</pre> */}
      </div>
    </div>
  );
};

export default Compiler3;
