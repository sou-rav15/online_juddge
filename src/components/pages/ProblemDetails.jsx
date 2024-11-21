


// // import React from 'react';
// // import { useParams } from 'react-router-dom';
// // import Compiler3 from '../otherComponents/compiler3.jsx';

// // function ProblemDetails({ problems }) {
// //   const { id } = useParams();
// //   const problem = problems.find(p => p._id === id);

// //   if (!problem) return <div>Select a problem to view details</div>;

// //   return (
// //     <div className="container-fluid mt-4">
// //       <div className="row">
// //         {/* Problem Details */}
// //         <div className="col-md-6">
// //           <div className="card">
// //             <div className="card-body">
// //               <h3>{problem.title}</h3>
// //               <p>{problem.description}</p>
// //               <div className="mt-3">
// //                 {problem.tags.map((tag, i) => (
// //                   <span key={i} className="badge bg-secondary me-1">{tag}</span>
// //                 ))}
// //               </div>
// //               <span className="badge bg-primary me-2 mt-2">{problem.difficulty}</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Compiler */}
// //         <div className="col-md-6">
// //           <div className="card">
// //             <div className="card-body">
// //               <Compiler3 problemId={problem._id} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProblemDetails;



// import React from 'react';
// import { useParams } from 'react-router-dom';
// import Compiler3 from '../otherComponents/compiler3.jsx';

// function ProblemDetails({ problems }) {
//   const { id } = useParams();
//   const problem = problems.find(p => p._id === id);

//   if (!problem) return <div>Select a problem to view details</div>;

//   return (
//     <div className="container-fluid mt-4">
//       <div className="row">
//         {/* Problem Details */}
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <h3>{problem.title}</h3>
//               <p>{problem.description}</p>
//               <div className="mt-3">
//                 {problem.tags.map((tag, i) => (
//                   <span key={i} className="badge bg-secondary me-1">{tag}</span>
//                 ))}
//               </div>
//               <span className="badge bg-primary me-2 mt-2">{problem.difficulty}</span>
//               {/* New Fields */}
//               <div className="mt-3">
//                 <h5>Time Limit</h5>
//                 <p>{problem.timeLimit} ms</p>
//                 {problem.note && (
//                   <>
//                     <h5>Note</h5>
//                     <p>{problem.note}</p>
//                   </>
//                 )}
//                 <h5>Constraints</h5>
//                 <ul>
//                   {problem.constraints.map((constraint, i) => (
//                     <li key={i}>{constraint}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Compiler */}
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <Compiler3 problemId={problem._id} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProblemDetails;


// import React from 'react';
// import { useParams } from 'react-router-dom';
// import Compiler3 from '../otherComponents/compiler3.jsx';

// function ProblemDetails({ problems }) {
//   const { id } = useParams();
//   const problem = problems.find(p => p._id === id);

//   if (!problem) return <div>Select a problem to view details</div>;

//   return (
//     <div className="container-fluid mt-4">
//       <div className="row">
//         {/* Problem Details */}
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <h3>{problem.title}</h3>
//               <p>{problem.description}</p>
//               <div className="mt-3">
//                 {problem.tags.map((tag, i) => (
//                   <span key={i} className="badge bg-secondary me-1">{tag}</span>
//                 ))}
//               </div>
//               <span className="badge bg-primary me-2 mt-2">{problem.difficulty}</span>
              
//               {/* New Fields */}
//               <div className="mt-3">
//                 <h5>Time Limit</h5>
//                 <p>{problem.timeLimit} ms</p>
//                 {problem.note && (
//                   <>
//                     <h5>Note</h5>
//                     <p>{problem.note}</p>
//                   </>
//                 )}
//                 <h5>Constraints</h5>
//                 <ul>
//                   {problem.constraints.map((constraint, i) => (
//                     <li key={i}>{constraint}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Examples Section */}
//               <div className="mt-3">
//                 <h5>Examples</h5>
//                 {problem.examples && problem.examples.length > 0 ? (
//                   problem.examples.map((example, i) => (
//                     <div key={i} className="mb-3">
//                       <h6>Example {i + 1}</h6>
//                       <div style={{ marginBottom: '10px' }}>
//                         <strong>Input:</strong>
//                         <pre>{example.input}</pre>
//                       </div>
//                       <div style={{ marginBottom: '10px' }}>
//                         <strong>Output:</strong>
//                         <pre>{example.output}</pre>
//                       </div>
//                       {example.explanation && (
//                         <div style={{ marginBottom: '10px' }}>
//                           <strong>Explanation:</strong>
//                           <p>{example.explanation}</p>
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <p>No examples provided.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Compiler */}
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <Compiler3 problemId={problem._id} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProblemDetails;


import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Compiler3 from '../otherComponents/compiler3.jsx';
import { useTheme } from '../Themes/Themes.jsx'; // Import the theme context
import './ProblemDetails.css'
import { useAuth } from '../Authentication/Authenticaton.jsx';
function ProblemDetails({ problems }) {
  const navigate =useNavigate();
  const { id } = useParams();
  const problem = problems.find(p => p._id === id);
  const { isDark } = useTheme(); // Get the current theme
  const { isAuthenticated } = useAuth(); 
const handleBack=()=>{
  navigate(-1);
}
if (!isAuthenticated) {
  navigate('/login');
      // return <div>Please log in to access the compiler.</div>; // Change the message as needed
    }
  if (!problem) return <div>Select a problem to view details</div>;

  return (
    <div className={`container-fluid mt-4 ${isDark ? 'dark' : ''}`}>
      <div className="row">
        {/* Problem Details */}
        <div className="col-md-6">
          <div className={`card ${isDark ? 'bg-dark text-light' : 'bg-light'}`}>
            <div className="card-body">
              <span><img onClick={handleBack} className="back-arrow" src="/backArrow.png" alt="backArrow" /></span>
              <h3>{problem.title}</h3>
              <pre className="description-pre">{problem.description}</pre>
              <div className="mt-3">
                {problem.tags.map((tag, i) => (
                  <span key={i} className="badge bg-secondary me-1">{tag}</span>
                ))}
              </div>
              <span className={`badge ${isDark ? 'bg-info' : 'bg-primary'} me-2 mt-2`}>{problem.difficulty}</span>
              
              {/* New Fields */}
              <div className="mt-3">
                <h5>Time Limit</h5>
                <p>{problem.timeLimit} ms</p>
                {problem.note && (
                  <>
                    <h5>Note</h5>
                    <pre className='description-pre'>{problem.note}</pre>
                  </>
                )}
                <h5>Constraints</h5>
                <ul>
                  {problem.constraints.map((constraint, i) => (
                    <pre className='constraint-pre'key={i}>{constraint}</pre>
                  ))}
                </ul>
              </div>

              <div className="mt-3">
                <h5>Examples</h5>
                {problem.examples && problem.examples.length > 0 ? (
                  problem.examples.map((example, i) => (
                    <div key={i} className="mb-3">
                      <h6>Example {i + 1}</h6>
                      <div style={{ marginBottom: '10px' }}>
                        <strong>Input:</strong>
                        <pre>{example.input}</pre>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <strong>Output:</strong>
                        <pre>{example.output}</pre>
                      </div>
                      {example.explanation && (
                        <div style={{ marginBottom: '10px' }}>
                          <strong>Explanation:</strong>
                          <p>{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No examples provided.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Compiler */}
        <div className="col-md-6">
          <div className={`card ${isDark ? 'bg-dark text-light' : 'bg-light'}`}>
            <div className="card-body">
              <h5>Code Compiler</h5>
              <Compiler3 problemId={problem._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;
