// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { HandleError, HandleSuccess } from '../../utils';
// import { ToastContainer} from 'react-toastify';


// function UpdateProblemPage() {
//     const apiUrl = import.meta.env.VITE_API_URL;

//     const { id } = useParams();
//     console.log('id->',id);
    
//     const navigate = useNavigate();
//     const [problem, setProblem] = useState({
//         title: '',
//         description: '',
//         difficulty: '',
//         tags: [],
//         timeLimit: 0,
//         note: '',
//         constraints: []
//     });

//     useEffect(() => {
//         const headers={
//             headers:{
//               'Authorization':localStorage.getItem('token')
//             }
//           }
//         async function fetchProblem() {
//             const response = await fetch(`${apiUrl}/Problems/${id}`,headers);
//             const data = await response.json();
//             console.log('data-',data)
//             setProblem(data);
//         }

//         fetchProblem();
//     }, [id]);

//     const handleChange = (e) => {
//         setProblem({ ...problem, [e.target.name]: e.target.value });
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`${apiUrl}/problems/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(problem)
//             });
//             if (response.ok) {
                
//                 // navigate(`/problems/${id}`);
//                 HandleSuccess('Pronlem Update Successfully')
//                 setTimeout(()=>{
//                     navigate(`/problems/${id}`);
//                 },1000)
//             } else {
//                 HandleError('Failed to Update Problems')
//                 console.error('Failed to update problem');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Update Problem</h2>
//             <form onSubmit={handleUpdate}>
//                 <div className="mb-3">
//                     <label htmlFor="title" className="form-label">Title</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="title"
//                         name="title"
//                         value={problem.title}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="description" className="form-label">Description</label>
//                     <textarea
//                         className="form-control"
//                         id="description"
//                         name="description"
//                         value={problem.description}
//                         onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="difficulty" className="form-label">Difficulty</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="difficulty"
//                         name="difficulty"
//                         value={problem.difficulty}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="tags" className="form-label">Tags</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="tags"
//                         name="tags"
//                         value={problem.tags.join(', ')}
//                         onChange={(e) =>
//                             setProblem({ ...problem, tags: e.target.value.split(',').map(tag => tag.trim()) })
//                         }
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="timeLimit" className="form-label">Time Limit</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="timeLimit"
//                         name="timeLimit"
//                         value={problem.timeLimit}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="note" className="form-label">Note</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="note"
//                         name="note"
//                         value={problem.note}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="constraints" className="form-label">Constraints</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="constraints"
//                         name="constraints"
//                         value={problem.constraints.join(', ')}
//                         onChange={(e) =>
//                             setProblem({ ...problem, constraints: e.target.value.split(',').map(constraint => constraint.trim()) })
//                         }
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Update Problem</button>
//             </form>
//             <ToastContainer/>
//         </div>
//     );
// }

// export default UpdateProblemPage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HandleError, HandleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';
// import Problems from '../../../../backend/models/Problems';

function UpdateProblemPage() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const navigate = useNavigate();

    const [problem, setProblem] = useState({
        title: '',
        description: '',
        difficulty: '',
        tags: [],
        timeLimit: 0,
        note: '',
        constraints: [],
        examples: [{ input: '', output: '', explanation: '' }] // Initialize with one example
    });

    useEffect(() => {
        const headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
        async function fetchProblem() {
            const response = await fetch(`${apiUrl}/Problems/${id}`, headers);
            const data = await response.json();
            setProblem(data);
        }

        fetchProblem();
    }, [id]);

    const handleChange = (e) => {
        setProblem({ ...problem, [e.target.name]: e.target.value });
    };

    const handleExampleChange = (index, e) => {
        const newExamples = problem.examples.map((example, i) =>
            i === index ? { ...example, [e.target.name]: e.target.value } : example
        );
        setProblem({ ...problem, examples: newExamples });
    };

    const addExample = () => {
        setProblem({ ...problem, examples: [...problem.examples, { input: '', output: '', explanation: '' }] });
    };

    const removeExample = (index) => {
        setProblem({ ...problem, examples: problem.examples.filter((_, i) => i !== index) });
    };
// console.log('upadeted data',problem);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/problems/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(problem)
            });
            if (response.ok) {
                HandleSuccess('Problem Updated Successfully');
                setTimeout(() => {
                    navigate(`/problems/${id}`);
                }, 1000);
            } else {
                HandleError('Failed to Update Problem');
            }
        } catch (error) {
            HandleError('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Problem</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={problem.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={problem.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="difficulty" className="form-label">Difficulty</label>
                    <input
                        type="text"
                        className="form-control"
                        id="difficulty"
                        name="difficulty"
                        value={problem.difficulty}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tags"
                        name="tags"
                        value={problem.tags.join(', ')}
                        onChange={(e) =>
                            setProblem({ ...problem, tags: e.target.value.split(',').map(tag => tag.trim()) })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="timeLimit" className="form-label">Time Limit</label>
                    <input
                        type="number"
                        className="form-control"
                        id="timeLimit"
                        name="timeLimit"
                        value={problem.timeLimit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="note" className="form-label">Note</label>
                    <input
                        type="text"
                        className="form-control"
                        id="note"
                        name="note"
                        value={problem.note}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="constraints" className="form-label">Constraints</label>
                    <input
                        type="text"
                        className="form-control"
                        id="constraints"
                        name="constraints"
                        value={problem.constraints.join(', ')}
                        onChange={(e) =>
                            setProblem({ ...problem, constraints: e.target.value.split(',').map(constraint => constraint.trim()) })
                        }
                        required
                    />
                </div>

                {/* Examples Section */}
                <div className="mb-3">
                    <label htmlFor="examples" className="form-label">Examples</label>
                    {problem.examples.map((example, index) => (
                        <div key={index} className="mb-4">
                            <textarea
                                className="form-control mb-2"
                                rows={2}
                                name="input"
                                placeholder="Input"
                                value={example.input}
                                onChange={(e) => handleExampleChange(index, e)}
                            ></textarea>
                            <textarea
                                className="form-control mb-2"
                                rows={2}
                                name="output"
                                placeholder="Output"
                                value={example.output}
                                onChange={(e) => handleExampleChange(index, e)}
                            ></textarea>
                            <textarea
                                className="form-control mb-2"
                                rows={2}
                                name="explanation"
                                placeholder="Explanation"
                                value={example.explanation}
                                onChange={(e) => handleExampleChange(index, e)}
                            ></textarea>
                            <button type="button" className="btn btn-danger" onClick={() => removeExample(index)}>
                                Remove Example
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary ms-2" onClick={addExample}>
                        Add Example
                    </button>
                </div>

                <button type="submit" className="btn btn-primary">Update Problem</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateProblemPage;

