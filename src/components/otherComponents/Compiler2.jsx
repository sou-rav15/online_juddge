import React, { useState } from 'react';
import { HandleError } from '../../utils';


const Compiler2 = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const runCode = async(e) => {
e.preventDefault()
const payLoad= {
  language:'cpp',
  code
};
if(!code){
  return HandleError("code is empty");
}

try {
  const url = "http://localhost:8000/run";
const response = await  fetch(url,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payLoad)
  
})

const result =await response.json();
console.log(result.output);
setOutput(result.output);
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
              <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="ruby">Ruby</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <textarea
                className="form-control"
                rows="10"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
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

export default Compiler2;
