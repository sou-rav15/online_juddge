import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddTestCase = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { id } = useParams();
  // console.log('id->',id);
  const apiUrl = import.meta.env.VITE_API_URL;
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

      // Clear the input fields after successful submission
      setInput('');
      setOutput('');
    } catch (error) {
      console.error('Error:', error);
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
        
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

// export default AddTestCase;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const AddTestCase = () => {
//   const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch existing test cases when component mounts
//     const fetchTestCases = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/Testcases/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch test cases');
//         }
//         const data = await response.json();
//         if (data) {
//           // Format the existing test cases
//           const formattedTestCases = data.input.map((inputCase, index) => ({
//             input: JSON.stringify(inputCase, null, 2),
//             output: JSON.stringify(data.expected_output[index], null, 2),
//           }));
//           setTestCases(formattedTestCases);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchTestCases();
//   }, [id]);

//   const handleAddTestCase = () => {
//     setTestCases([...testCases, { input: '', output: '' }]);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedTestCases = [...testCases];
//     updatedTestCases[index][field] = value;
//     setTestCases(updatedTestCases);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formattedTestCases = testCases.map((testCase) => ({
//       input: JSON.parse(testCase.input),
//       expected_output: JSON.parse(testCase.output),
//     }));
// console.log('formatted',formattedTestCases);
//     try {
//       const response = await fetch(`http://localhost:8000/Testcases/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formattedTestCases),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update test cases');
//       }

//       const result = await response.json();
//       console.log('Test cases updated:', result);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Edit/Add Test Cases</h3>
//       <form onSubmit={handleSubmit}>
//         {testCases.map((testCase, index) => (
//           <div key={index} className="mb-3">
//             <label htmlFor={`input-${index}`} className="form-label">Input</label>
//             <textarea
//               id={`input-${index}`}
//               rows="3"
//               value={testCase.input}
//               onChange={(e) => handleChange(index, 'input', e.target.value)}
//               className="form-control"
//               placeholder='Enter input as JSON (e.g., {"size":4, "nums":[1,2,3,4], "k":2})'
//             />
//             <small className="form-text text-muted">
//               Ensure input is in valid JSON format.
//             </small>

//             <label htmlFor={`output-${index}`} className="form-label mt-3">Expected Output</label>
//             <textarea
//               id={`output-${index}`}
//               rows="2"
//               value={testCase.output}
//               onChange={(e) => handleChange(index, 'output', e.target.value)}
//               className="form-control"
//               placeholder='Enter expected output as JSON (e.g., [3,4,1,2])'
//             />
//           </div>
//         ))}
//         <button type="button" className="btn btn-secondary mb-3" onClick={handleAddTestCase}>
//           Add Another Test Case
//         </button>
//         <button type="submit" className="btn btn-primary">Save Test Cases</button>
//       </form>
//     </div>
//   );
// };

// export default AddTestCase;

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useParams } from 'react-router-dom';

// const AddTestCases = () => {
//   const [inputs, setInputs] = useState([{ size: '', nums: [] }]);
//   const [expectedOutputs, setExpectedOutputs] = useState(['']);
//   const { id } = useParams();

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const newInputs = [...inputs];
//     newInputs[index] = { ...newInputs[index], [name]: value };
//     setInputs(newInputs);
//   };

//   const handleNumsChange = (index, event) => {
//     const { value } = event.target;
//     const nums = value.split(',').map(Number); // Split by comma and convert to numbers
//     const newInputs = [...inputs];
//     newInputs[index] = { ...newInputs[index], nums };
//     setInputs(newInputs);
//   };

//   const handleExpectedOutputChange = (index, event) => {
//     const { value } = event.target;
//     const newOutputs = [...expectedOutputs];
//     newOutputs[index] = value;
//     setExpectedOutputs(newOutputs);
//   };

//   const addInput = () => {
//     setInputs([...inputs, { size: '', nums: [] }]);
//     setExpectedOutputs([...expectedOutputs, '']);
//   };

//   const removeInput = (index) => {
//     const newInputs = inputs.filter((_, i) => i !== index);
//     const newOutputs = expectedOutputs.filter((_, i) => i !== index);
//     setInputs(newInputs);
//     setExpectedOutputs(newOutputs);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     // Ensure inputs and expected_outputs are aligned
//     if (inputs.length !== expectedOutputs.length) {
//       alert('Mismatch between inputs and expected outputs');
//       return;
//     }

//     // Validate inputs
//     for (const input of inputs) {
//       if (input.size <= 0 || input.nums.length === 0) {
//         alert('Invalid input data');
//         return;
//       }
//     }

//     try {
//       const response = await fetch(`http://localhost:8000/testcases/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ input: inputs, expected_output: expectedOutputs })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update test cases');
//       }

//       const data = await response.json();
//       console.log('Updated test cases:', data);
//       alert('Test cases updated successfully');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error updating test cases');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Update Test Cases</h2>
//       <form onSubmit={handleSubmit}>
//         {inputs.map((input, index) => (
//           <div key={index} className="mb-3">
//             <div className="input-group">
//               <input
//                 type="number"
//                 className="form-control"
//                 name="size"
//                 placeholder="Size"
//                 value={input.size}
//                 onChange={(e) => handleInputChange(index, e)}
//                 min="1"
//               />
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Nums (comma separated)"
//                 value={input.nums.join(',')}
//                 onChange={(e) => handleNumsChange(index, e)}
//               />
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => removeInput(index)}
//               >
//                 Remove
//               </button>
//             </div>
//             <input
//               type="text"
//               className="form-control mt-2"
//               placeholder="Expected Output"
//               value={expectedOutputs[index] || ''}
//               onChange={(e) => handleExpectedOutputChange(index, e)}
//             />
//           </div>
//         ))}
//         <button type="button" className="btn btn-primary mb-3" onClick={addInput}>
//           Add Test Case
//         </button>
//         <button type="submit" className="btn btn-success">Submit</button>
//       </form>
//     </div>
//   );
// };

export default AddTestCase;


