// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { HandleError } from '../../utils';
// // import handleProblemSubmission from './Submission/Submission.jsx';
// import MonacoEditor from '@monaco-editor/react';
// import * as monaco from 'monaco-editor';
// // import saveCodeToBackend from './codeSave/CodeSave';
// const Compiler2 = ({ problemId }) => {
//   const [language, setLanguage] = useState('cpp');
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const apiUrl = 'http://localhost:8000';
//   const languageMapping = {
//     cpp: 'cpp',
//     js: 'javascript',
//     py: 'python',
//     java: 'java'
//   };
//   // const userId= localStorage.getItem('userId');
//   // useEffect(() => {
   
//   //   // console.log('im here')
//   //   const fetchSavedCode = async () => {
//   //     try {
//   //       const url = `${apiUrl}/codeSave/${userId}/${problemId}`; // Include userId
//   //       const headers={
//   //         headers:{
//   //           'Authorization':localStorage.getItem('token')
//   //         }
//   //       }
//   //       const response = await fetch(url,headers);
//   //       const result = await response.json();
//   //       if (result.code) {
//   //         setCode(result.code); // Set the fetched code in the editor
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching saved code:', error);
//   //     }
//   //   };
  
//   //   fetchSavedCode();
//   // }, [problemId, userId]);
  

//   const handleRunCode = async(e) => {
//     // Logic for running code (e.g., send code and input to backend)
//     e.preventDefault();
//     const payLoad = {
//       language,
//       code,
//       input,
//     };

//     if (!code) {
//       return alert('Code is empty');
//     }

//     try {
//       const url = 'http://localhost:8000/run'; // Replace with your actual URL
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payLoad),
//       });

//       const result = await response.json();

//       if (result.output) {
//         setOutput(result.output);
//       } else {
//         setOutput(result.error.stderr ? result.error.stderr : result.error);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     // setOutput('Output will be displayed here.');
//   };

//   const handleSubmitCode = async(e) => {
//   e.preventDefault()
//     const payLoad = {
//       problem_id: problemId,
//       language,
//       code
//     };
//     if (!code) {
//       return HandleError("code is empty");
//     }

//     try {
//       const url = `${apiUrl}/CheckTestCases`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payLoad)

//       })
//       // console.log(response);

//       const result = await response.json();
//       console.log('result is->',result);

  
//    const Status = result.map((obj) => obj.status);
//       const finalStatus = Status.every(state => state === 'Accepted') ? 'Accepted' : 'Not Accepted';
//       const statusMessages = result.map((obj, index) => {
//         return `Test Case ${index + 1}: ${obj.status}`;

//       });
    
//       // console.log('staus message->',Status)
//       setOutput(statusMessages.join('\n'));


//       // handleProblemSubmission(problemId, finalStatus);
//       // saveCodeToBackend(problemId,code);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       {/* Language Selector */}
//       <div className="mb-2">
//         <select
//           className="form-select"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="cpp">C++</option>
//           <option value="js">JavaScript</option>
//           <option value="py">Python</option>
//           {/* <option value="java">Java</option> */}
//         </select>
//       </div>

//       {/* Code Editor */}
//       <div className="mb-2">
//       <MonacoEditor
//                 height="400px"
//                 language={languageMapping[language]} // Use mapped value
//                 value={code}
//                 theme="myCustomTheme"
//                 options={{
//                   selectOnLineNumbers: true,
//                   automaticLayout: true,
//                   autoClosingBrackets: 'always',
//                   fontSize: 14
//                 }}
//                 onChange={(value) => setCode(value)}
//               />
//       </div>

//       {/* Input Area */}
//       <div className="mb-2">
//         <textarea
//           className="form-control"
//           rows="3"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Input data (if any)..."
//         ></textarea>
//       </div>

//       {/* Buttons */}
//       <div className="mb-2 d-flex justify-content-between">
//         <button className="custom-button" onClick={handleRunCode}>
//           Run Code
//         </button>
//         <button className="btn btn-primary" onClick={handleSubmitCode}>
//           Submit Code
//         </button>
//       </div>

//       {/* Output Area */}
//       <div className="border p-3 bg-light" style={{ minHeight: '100px' }}>
//         <pre>{output}</pre>
//       </div>
//     </div>
//   );
// };

// export default Compiler2;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../../components/Themes/Themes';
import { HandleError } from '../../utils';
import ReactCodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import './Compiler.css';
import { EditorView } from '@codemirror/view'; // Import necessary components
// import './codeMirrorStyles.css'; // You can add custom styles if needed

const Compiler2 = ({ problemId }) => {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const apiUrl = 'http://localhost:3000';
  const { isDark } = useTheme();
  const languageMapping = {
    cpp: cpp(),
    js: javascript(),
    py: python(),
    java: java(),
    C: cpp(),
  };

  const defaultSnippets = {
    C: '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
   cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}',
   js: 'console.log("Hello, World!");',
   py: 'print("Hello, World!")',
   java: ' class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
 };

 const handleLanguage = (e) => {
  const selectedLanguage = e.target.value;
  setLanguage(selectedLanguage);
};

useEffect(() => {
  setCode(defaultSnippets[language]);
}, [language]);

  const handleRunCode = async (e) => {
    e.preventDefault();
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

      if (result.output) {
        setOutput(result.output);
      } else {
        setOutput(result.error.stderr ? result.error.stderr : result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    const payLoad = {
      problem_id: problemId,
      language,
      code,
    };

    if (!code) {
      return HandleError('Code is empty');
    }

    try {
      const url = `${apiUrl}/CheckTestCases`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      });

      const result = await response.json();
      const Status = result.map((obj) => obj.status);
      const finalStatus = Status.every((state) => state === 'Accepted') ? 'Accepted' : 'Not Accepted';
      const statusMessages = result.map((obj, index) => {
        return `Test Case ${index + 1}: ${obj.status}`;
      });

      setOutput(statusMessages.join('\n'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Language Selector */}
      <div className="mb-2">
        <select
          className="form-select"
          value={language}
          onChange={handleLanguage}
        >
          <option value="cpp">C++</option>
          <option value="C">C</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      {/* Code Editor */}
      <div className="mb-2">
        <ReactCodeMirror
          value={code}
          height="400px"
          extensions={[languageMapping[language]]} // Set language extension based on selected language
          onChange={(value) => setCode(value)}
          theme={isDark ? oneDark : 'light'}
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

export default Compiler2;
