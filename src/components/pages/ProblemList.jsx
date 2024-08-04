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



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProblemList({ problems }) {
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/updateProblem/${id}`);
  };

  const handleNewButtonClick = (id) => {
    // Handle the new button click action here
    navigate(`/AddTestCases/${id}`);

    console.log('New Button Clicked for Problem ID:', id);
  };

  return (
    <div className="col-12 col-md-8">
      <h3>Problems</h3>
      <ul className="list-group">
        {problems.map((problem) => (
          <li
            key={problem._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '5px', 
              padding: '10px',
              marginBottom: '10px'
            }}
          >
            <div className="d-flex align-items-center w-100">
              {/* Button to perform new action */}
              <button
                className="btn btn-secondary me-2"
                onClick={() => handleNewButtonClick(problem._id)}
                style={{ flexShrink: 0 }}
              >
              AddTestCases
              </button>
              {/* Link to view the problem */}
              <Link
                style={{ textDecoration: 'none', color: 'black', flexGrow: 1 }}
                to={`/Problems/${problem._id}`}
                className="btn btn-link"
              >
                {problem.title}
              </Link>
              {/* Button to update the problem */}
              <button
                className="btn btn-primary ms-2"
                onClick={() => handleUpdate(problem._id)}
                style={{ flexShrink: 0 }}
              >
                Update Question
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemList;
