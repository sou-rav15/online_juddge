import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HandleError, HandleSuccess } from '../../utils';
import { ToastContainer} from 'react-toastify';


function UpdateProblemPage() {
    const { id } = useParams();
    console.log('id->',id);
    
    const navigate = useNavigate();
    const [problem, setProblem] = useState({
        title: '',
        description: '',
        difficulty: '',
        tags: [],
        timeLimit: 0,
        note: '',
        constraints: []
    });

    useEffect(() => {
        async function fetchProblem() {
            const response = await fetch(`http://localhost:8000/Problems/${id}`);
            const data = await response.json();
            console.log('data-',data)
            setProblem(data);
        }

        fetchProblem();
    }, [id]);

    const handleChange = (e) => {
        setProblem({ ...problem, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/problems/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(problem)
            });
            if (response.ok) {
                
                // navigate(`/problems/${id}`);
                HandleSuccess('Pronlem Update Successfully')
                setTimeout(()=>{
                    navigate(`/problems/${id}`);
                },1000)
            } else {
                HandleError('Failed to Update Problems')
                console.error('Failed to update problem');
            }
        } catch (error) {
            console.error('Error:', error);
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
                <button type="submit" className="btn btn-primary">Update Problem</button>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default UpdateProblemPage;
