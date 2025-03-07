// import React, { useState ,useEffect} from 'react';
// import { HandleError } from '../../utils';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import MonacoEditor from '@monaco-editor/react';
// import './Compiler.css'
// const Compiler1= () => {
//   const languageMapping = {
//     cpp: 'cpp',
//     js: 'javascript',
//     py: 'python',
//     java: 'java'
//   };

//   const defaultCodeSnippets = {
//     cpp: `#include <iostream>
//   using namespace std;
  
//   int main() {
//       // Your code here
//       return 0;
//   }`,
//     py: `def main():
//       # Your code here
//       pass
  
//   if __name__ == "__main__":
//       main()`,
//     js: `function main() {
//       // Your code here
//   }
  
//   main();`,
//     java: `public class Main {
//       public static void main(String[] args) {
//           // Your code here
//       }
//     }`,
//   };


//   const [language, setLanguage] = useState('cpp');
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState(''); // Added input state
//   const [output, setOutput] = useState('');
//   // const apiUrl = import.meta.env.VITE_API_URL;
//   const apiUrl = 'https://bcknd.codehub.org.in';

//   const handleLanguageChange = (e) => {
//     const selectedLanguage = e.target.value;
//     setLanguage(selectedLanguage);
    
//   }
//   useEffect(() => {
//     // Update the code with the default snippet for the selected language
//     setCode(defaultCodeSnippets[language]);
//   }, [language]);
//     const runCode = async (e) => {
//     e.preventDefault();
//     // if(language==="Javascript") setLanguage('js');
// // console.log('language is ->',language);
//     const payLoad = {
//       language,
//       code,
//       input // Include input in the payload
//     };

//     if (!code) {
//       return HandleError("Code is empty");
//     }
// // console.log("payLoad is->",payLoad)
//     try {
//       const url = `${apiUrl}/run`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payLoad)
//       });

//       const result = await response.json();
//       // console.log(result.output);
//       if(result.output){// this part is chanaged
//         setOutput(result.output);
//       }
// else{
//   setOutput(result.error.stderr)
// }
//     } catch (error) {
//       console.log(error);
//     }
//     console.log(code);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header">
//           <h3>CodeHub.com</h3>
//         </div>
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-4">
//               <select className="form-control" value={language} onChange={handleLanguageChange}>
//                 <option value="js">JavaScript</option>
//                 <option value="py">Python</option>
//                 <option value="cpp">C++</option>
//                 <option value="java">Java</option>
//                 {/* <option value="ruby">Ruby</option> */}
//               </select>
//             </div>
//           </div>
//           <div className="row mb-3">
//           <div className="col-md-8  editor-container">
//               <MonacoEditor
//                 height="400px"
//                 language={languageMapping[language]}
//                 value={code}
//                 options={{
//                   selectOnLineNumbers: true,
//                   automaticLayout: true, fontSize: 14
//                 }}
//                 onChange={(value) => setCode(value)}
//               />
//             </div>
//             <div className="col-md-4">
//               <textarea
//                 className="form-control"
//                 rows="10"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Provide input here..."
//               ></textarea>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-12 text-center">
//               <button className="custom-button" onClick={runCode}>
//                 Run Code
//               </button>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="p-3 border bg-light" style={{ minHeight: '100px' }}>
//                 <pre>{output}</pre>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Compiler1;

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../components/Themes/Themes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactCodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { useAuth } from '../Authentication/Authenticaton'; // Correct the path if necessary
import './Compiler.css';
import { useNavigate } from 'react-router-dom';

import { ThreeDots } from 'react-loader-spinner';
import Loader from './Loading/Loading.jsx';
import Timer from './Timer/Timer.jsx';
const Compiler1 = () => {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [executionTime, setExecutionTime] = useState(0);
  const { isAuthenticated } = useAuth(); 
  const { isDark } = useTheme();
  const navigate = useNavigate();
  // const apiUrl = 'https://bcknd.codehub.org.in';
  // const apiUrl='http://localhost:3000';
  const apiUrl = import.meta.env.VITE_API_URL
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
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

  const runCode = async (e) => {
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
      console.log('start');
      // setLoading(true);
      const url = `${apiUrl}/run`;
      // const url = 'http://localhost:8000/run'; // Replace with your actual URL
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      });

      const result = await response.json();
console.log('resultt is->',result);

      if (result.output) {
        setOutput(result.output);
        setExecutionTime(result.executionTime);
      } else{
        setOutput(result.error.stderr ? result.error.stderr : result.error.error?result.error.error:result.error||"Unknown error please check code and try again");
      }
      // else{
      //   console.log('res', result.error.error);
        
      //   setOutput(result.error.error||"An unknown error occured please check code and try again");
      // }
    }    
    catch (error) {
      console.log(error);
    }
 
    
    finally {
      
      // setLoading(false); // Stop loading
    }
  };

  // Check if user is authenticated
  if (!isAuthenticated) {
navigate('/login');
    // return <div>Please log in to access the compiler.</div>; // Change the message as needed
  }
  
  if (loading) {
    return <Loader />; // Show the loader while loading is true
  }
  return (

    <>
    {/* <Timer/> */}
  <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3>CodeHub.com</h3>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <select className="custom-select" value={language} onChange={handleLanguage}>
                {/* <option value="js">JavaScript</option> */}
                <option value="py">Python</option>
                <option value="cpp">C++</option>
                <option value="C">C</option>
                <option value="java">Java</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-8 textArea">
              <ReactCodeMirror
                value={code}
                height="400px"
                extensions={[languageMapping[language]]}
                theme={isDark ? oneDark : 'light'} // Toggle between dark and light themes
                onChange={(value) => setCode(value)}
              />
            </div>
            <div className="col-md-4">
              <textarea
                className="form-control"
                rows="10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Provide input here..."
              ></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12 text-center">
              <button className="custom-button" onClick={runCode}>
                Run Code
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="p-3 border output-area" style={{ minHeight: '100px' }}>
                <pre>{output}
                  <h6 className='mt-4'>execution-time:{executionTime/1000}s</h6>
                  <h6 className='text-center'>---succesfully executed ---</h6>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default Compiler1;