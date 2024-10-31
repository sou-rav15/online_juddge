// // // src/components/pages/ProblemList.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // function ProblemList({ problems }) {
// // // (async(e)=>{
// // // e.preventDefault();
// // // })()


// //   return (
// //     <div className="col-4">
// //       <h3>Problems</h3>
// //       <ul className="list-group">
// //         {problems.map(problem => (
// //           <li key={problem._id} className="list-group-item">
// //             <Link style={{textDecoration:"none", color:"black"}} to={`/Problems/${problem._id}`} className="btn btn-link">{problem.title}</Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default ProblemList;

// // src/components/pages/ProblemList.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function ProblemList({ problems }) {
//   const navigate = useNavigate();

//   const handleUpdate = (id) => {
//     navigate(`/updateProblem/${id}`);
//   };

//   return (
//     <div className="col-12 col-md-8">  {/* Adjusted the column width */}
//       <h3>Problems</h3>
//       <ul className="list-group">
//         {problems.map((problem) => (
//           <li key={problem._id} className="list-group-item d-flex justify-content-between align-items-center">
//             {/* Link to view the problem */}
//             <Link
//               style={{ textDecoration: 'none', color: 'black' }}
//               to={`/Problems/${problem._id}`}
//               className="btn btn-link"
//             >
//               {problem.title}
//             </Link>
//             {/* Button to update the problem */}

//             <button
//               className="btn btn-primary"
//               onClick={() => handleUpdate(problem._id)}
//             >
//               UpdateQestion
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProblemList;



// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function ProblemList({ problems }) {
//   const navigate = useNavigate();

//   const handleUpdate = (id) => {
//     navigate(`/updateProblem/${id}`);
//   };

//   const handleNewButtonClick = (id) => {
//     // Handle the new button click action here
//     navigate(`/AddTestCases/${id}`);

//     console.log('New Button Clicked for Problem ID:', id);
//   };

//   return (
//     <div className="col-12 col-md-8">
//       <h3>Problems</h3>
//       <ul className="list-group">
//         {problems.map((problem) => (
//           <li
//             key={problem._id}
//             className="list-group-item d-flex justify-content-between align-items-center"
//             style={{ 
//               border: '1px solid #ddd', 
//               borderRadius: '5px', 
//               padding: '10px',
//               marginBottom: '10px'
//             }}
//           >
//             <div className="d-flex align-items-center w-100">
//               {/* Button to perform new action */}
//               <button
//                 className="btn btn-secondary me-2"
//                 onClick={() => handleNewButtonClick(problem._id)}
//                 style={{ flexShrink: 0 }}
//               >
//               AddTestCases
//               </button>
//               {/* Link to view the problem */}
//               <Link
//                 style={{ textDecoration: 'none', color: 'black', flexGrow: 1 }}
//                 to={`/Problems/${problem._id}`}
//                 className="btn btn-link"
//               >
//                 {problem.title}
//               </Link>
//               {/* Button to update the problem */}
//               <button
//                 className="btn btn-primary ms-2"
//                 onClick={() => handleUpdate(problem._id)}
//                 style={{ flexShrink: 0 }}
//               >
//                 Update Question
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProblemList;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './ProblemList.css'; // Import the custom CSS file

// function ProblemList({ problems }) {
//   const navigate = useNavigate();

//   const handleUpdate = (id) => {
//     navigate(`/updateProblem/${id}`);
//   };

//   const handleNewButtonClick = (id) => {
//     navigate(`/AddTestCases/${id}`);
//     // console.log('New Button Clicked for Problem ID:', id);
//   };

//   return (
//     <div className="col-12 col-md-8">
//       <h3>Problems</h3>
//       <ul className="list-group">
//         {problems.map((problem) => (
//           <li
//             key={problem._id}
//             className="list-group-item"
//           >
//             <div className="d-flex flex-column align-items-start">
//               {/* Link to view the problem */}
//               <Link
//                 to={`/Problems/${problem._id}`}
//                 className="btn btn-link text-decoration-none text-dark mb-2"
//               >
//                 {problem.title}
//               </Link>
              
//               <div className="d-flex flex-column flex-sm-row gap-2 w-100">
//                 {/* Button to perform new action */}
//                 <button
//                   className=" custom-buttons"
//                   onClick={() => handleNewButtonClick(problem._id)}
//                 >
//                   AddTestCases
//                 </button>
                
//                 {/* Button to update the problem */}
//                 <button
//                   className="custom-buttons"
//                   onClick={() => handleUpdate(problem._id)}
//                 >
//                   Update Question
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProblemList;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/Authenticaton.jsx'; // Adjust the import based on your file structure
import './ProblemList.css'; // Import the custom CSS file
import Loader from '../otherComponents/Loading/Loading.jsx'; // Import your loader component

function ProblemList({ problems }) {
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get the authentication state

  // Simulate loading for a few seconds (e.g., 2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleUpdate = (id) => {
    navigate(`/updateProblem/${id}`);
  };

  const handleNewButtonClick = (id) => {
    navigate(`/AddTestCases/${id}`);
  };

  // Conditional rendering based on authentication state
  if (!isAuthenticated) {
    return <div>Please log in to view the problems.</div>;
  }

  // Show loader while loading
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="custom-z-index col-12 col-md-8 ps-4 pe-4">
      <h3>Problems</h3>
      <ul className="list-group">
        {problems.map((problem) => (
          <li key={problem._id} className="list-group-item">
            <div className="d-flex flex-column align-items-start">
              {/* Link to view the problem */}
              <Link
                to={`/Problems/${problem._id}`}
                className="btn btn-link text-decoration-none mb-2 problem-title"
              >
                {problem.title}
              </Link>

              <div className="d-flex flex-column flex-sm-row gap-2 w-100">
                {/* Button to perform new action */}
                <button
                  className="custom-buttons"
                  onClick={() => handleNewButtonClick(problem._id)}
                >
                  Add Test Cases
                </button>

                {/* Button to update the problem */}
                <button
                  className="custom-buttons"
                  onClick={() => handleUpdate(problem._id)}
                >
                  Update Question
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemList;
