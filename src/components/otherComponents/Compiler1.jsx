import React, { useState } from 'react';
import { HandleError } from '../../utils';
import 'bootstrap/dist/css/bootstrap.min.css';

const Compiler1= () => {
  const defaultCodeSnippets = {
    cpp: `#include <iostream>
  using namespace std;
  
  int main() {
      // Your code here
      return 0;
  }`,
    py: `def main():
      # Your code here
      pass
  
  if __name__ == "__main__":
      main()`,
    js: `function main() {
      // Your code here
  }
  
  main();`,
    java: `public class Main {
      public static void main(String[] args) {
          // Your code here
      }
    }`,
  };


  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [input, setInput] = useState(''); // Added input state
  const [output, setOutput] = useState('');
  // const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrl = 'https://backend.codehub.org.in';

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    console.log('language is ->',language);
    
    // Set default code based on selected language
    setCode(defaultCodeSnippets[selectedLanguage] || '');
  }

    const runCode = async (e) => {
    e.preventDefault();
    // if(language==="Javascript") setLanguage('js');
// console.log('language is ->',language);
    const payLoad = {
      language,
      code,
      input // Include input in the payload
    };

    if (!code) {
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
      // console.log(result.output);
      if(result.output){// this part is chanaged
        setOutput(result.output);
      }
else{
  setOutput(result.error.stderr)
}
    } catch (error) {
      console.log(error);
    }
    console.log(code);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3>CodeHub.com</h3>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <select className="form-control" value={language} onChange={handleLanguageChange}>
                <option value="js">JavaScript</option>
                <option value="py">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                {/* <option value="ruby">Ruby</option> */}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-8">
              <textarea
                className="form-control"
                rows="10"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
              ></textarea>
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
              <button className="btn btn-success" onClick={runCode}>
                Run Code
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="p-3 border bg-light" style={{ minHeight: '100px' }}>
                <pre>{output}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler1;
