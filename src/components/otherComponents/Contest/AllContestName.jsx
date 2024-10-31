// import React, { useEffect, useState } from 'react';
// import './ContestPage.css';
// import Loader from '../Loading/Loading.jsx';
// import Timer from '../Timer/Timer.jsx';
// import { useTimer } from '../Timer/TimerContext.jsx';
// import { useNavigate } from 'react-router-dom';

// const ContestPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeContestId, setActiveContestId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const { active, startTimer } = useTimer();
//   const timerDuration = 120; // Timer duration in seconds
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchQuestions() {
//       try {
//         const response = await fetch('http://localhost:8000/contestQuestion');
//         const data = await response.json();
//         setQuestions(data.contests);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const endTime = localStorage.getItem('endTime');
//     setActiveContestId(localStorage.getItem('contestId'));

//     if (endTime) {
//       const remainingTime = Math.floor((endTime - Date.now()) / 1000);
//       if (remainingTime > 0) {
//         startTimer(remainingTime);
//       } else {
//         handleTimerEnd();
//       }
//     }
//   }, [startTimer]);

//   const handleSolve = (contestId) => {
//     if (!active) {
//       const currentTime = Date.now();
//       const endingTime = currentTime + timerDuration * 1000;

//       localStorage.setItem('endTime', endingTime);
//       localStorage.setItem('contestId', contestId);
//       startTimer(timerDuration);
//     }
//     setActiveContestId(contestId);
//   };

//   const handleTimerEnd = () => {
//     localStorage.removeItem('endTime');
//     localStorage.removeItem('contestId');
//     setShowModal(true);
//   };

//   const handleContinue = (contestId) => {
//     navigate(`/ShowContestQuestion/${contestId}`);
//   };

//   const handleReload = () => {
//     setShowModal(false);
//     window.location.reload();
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="contest-container">
//       <h1 className="contest-title">Contest</h1>
//       <Timer />
//       <div className="questions-container">
//         {questions.map((question) => (
//           <div key={question._id} className="question-box">
//             <h3>{question.title}</h3>
//             <div className="button-container">
//               {activeContestId === question._id ? (
//                 <button className="continue-button" onClick={() => handleContinue(question._id)}>
//                   Continue
//                 </button>
//               ) : (
//                 <button
//                   className="solve-button"
//                   onClick={() => handleSolve(question._id)}
//                   disabled={active}
//                 >
//                   Start Contest
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Time's Up!</h2>
//             <p>The contest time has expired. Please select another contest.</p>
//             <button onClick={handleReload}>Reload</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContestPage;




// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './ContestPage.css';
// // import Loader from '../Loading/Loading.jsx';
// // import Timer from '../Timer/Timer.jsx';
// // import { useTimer } from '../Timer/TimerContext.jsx';

// // const ContestPage = () => {
// //   const navigate = useNavigate();
// //   const [questions, setQuestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [activeContestId, setActiveContestId] = useState(null);
// //   const [timerExpired, setTimerExpired] = useState(false);
// //   const apiUrl = 'http://localhost:8000';
// //   const { startTimer, resetTimer, active, remainingTime } = useTimer(); // Get timer functions and remaining time

// //   useEffect(() => {
// //     async function fetchQuestions() {
// //       try {
// //         const response = await fetch(`${apiUrl}/contestQuestion`);
// //         const data = await response.json();
// //         setQuestions(data.contests);
// //       } catch (error) {
// //         console.error('Error fetching questions:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchQuestions();
// //   }, []);

// //   useEffect(() => {
// //     // Check localStorage for timer state and remaining time
// //     const activeTimer = localStorage.getItem('activeTimer');
// //     const contestId = localStorage.getItem('activeContestId');
// //     const timeRemaining = localStorage.getItem('remainingTime');

// //     if (activeTimer === 'true' && contestId) {
// //       setActiveContestId(contestId);
// //       // If there is remaining time, start the timer with that value
// //       if (timeRemaining) {
// //         startTimer(parseInt(timeRemaining, 10)); // Start timer with remaining time
// //       }
// //     }
// //   }, [startTimer]);

// //   const handleSolve = (questionId) => {
// //     if (!active) {
// //       // Start the timer only if it's not active
// //       startTimer(120); // Start the timer for 120 seconds
// //       localStorage.setItem('activeTimer', 'true'); // Store timer state in localStorage
// //       localStorage.setItem('activeContestId', questionId); // Store active question ID
// //       localStorage.setItem('remainingTime', '120'); // Store initial remaining time
// //     }
// //     setActiveContestId(questionId); // Set the active contest
// //   };

// //   const handleContinue = (questionId) => {
// //     navigate(`/ShowContestQuestion/${questionId}`);
// //   };

// //   const handleExpire = () => {
// //     setTimerExpired(true);
// //     resetTimer(); // Reset the timer
// //     localStorage.removeItem('activeTimer'); // Clear timer state from localStorage
// //     localStorage.removeItem('activeContestId'); // Clear active contest ID
// //     localStorage.removeItem('remainingTime'); // Clear remaining time from localStorage
// //     setActiveContestId(null); // Reset the active contest
// //   };

// //   if (loading) {
// //     return <Loader />;
// //   }

// //   return (
// //     <div className="contest-container">
// //       <h1 className="contest-title">Contest</h1>
// //       <Timer /> {/* Display the timer */}
// //       <div className="questions-container">
// //         {questions.map((question) => (
// //           <div key={question._id} className="question-box">
// //             <h3>{question.title}</h3>
// //             {activeContestId === question._id ? (
// //               <button className="continue-button" onClick={() => handleContinue(question._id)}>
// //                 Continue
// //               </button>
// //             ) : (
// //               <button
// //                 className="solve-button"
// //                 onClick={() => handleSolve(question._id)}
// //                 disabled={active} // Disable if the timer is active
// //               >
// //                 Start Contest
// //               </button>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //       {timerExpired && (
// //         <div className="end-message">
// //           <h2>Timer expired! You can now select a new contest.</h2>
// //           <button onClick={() => setTimerExpired(false)}>Okay</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ContestPage;



import React, { useEffect, useState } from 'react';
import './ContestPage.css';
import Loader from '../Loading/Loading.jsx';
import Timer from '../Timer/Timer.jsx';
import { useTimer } from '../Timer/TimerContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/Authenticaton.jsx';

const ContestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeContestId, setActiveContestId] = useState(null);
  const [showModal, setShowModal] = useState(false); // For showing the message box modal
  const { active, time, startTimer, stopTimer } = useTimer();
  const timerDuration = 60; // Timer duration in seconds
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://localhost:8000/contestQuestion');
        const data = await response.json();
        setQuestions(data.contests);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    const endTime = localStorage.getItem('endTime');
    setActiveContestId(localStorage.getItem('contestId'));

    if (endTime) {
      const remainingTime = Math.floor((endTime - Date.now()) / 1000);

      if (remainingTime > 0) {
        startTimer(remainingTime);
      } else {
        handleTimerEnd(); // Show modal if time has already expired
      }
    }
  }, [startTimer, activeContestId]);

  const handleSolve = (contestId) => {
    if (!active) {
      const currentTime = Date.now();
      const endingTime = currentTime + timerDuration * 1000;

      localStorage.setItem('endTime', endingTime);
      localStorage.setItem('contestId', contestId);

      startTimer(timerDuration);
    }
    setActiveContestId(contestId);
  };

  const handleTimerEnd = () => {
    // Clear local storage and show modal
    localStorage.removeItem('endTime');
    localStorage.removeItem('contestId');
    setShowModal(true);
  };

  const handleFullscreen = () => {
    const container = document.documentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleContinue = (contestId) => {
    navigate(`/ShowContestQuestion/${contestId}`);
  };

  const handleReload = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page
  };
  if (!isAuthenticated) {
    navigate('/login');
        // return <div>Please log in to access the compiler.</div>; // Change the message as needed
      }
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="contest-container">
      <h1 className="contest-title">Contest</h1>
      <div className="time-left">
      <Timer onEnd={handleTimerEnd} />
      </div>
    
      <button onClick={handleFullscreen} className="fullscreen-button">
        Fullscreen
      </button>

      <div className="questions-container">
        {questions.map((question) => (
          <div key={question._id} className="question-box">
            <h3>{question.title}</h3>
            {activeContestId === question._id ? (
              <>
                <button className="continue-button" onClick={() => handleContinue(question._id)}>
                  Continue
                </button>
              </>
            ) : (
              <button
                className="solve-button"
                onClick={() => handleSolve(question._id)}
                disabled={active}
              >
                Start Contest
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal to show when timer ends */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Time's up!</h2>
            <p>Your time for this contest has expired.</p>
            <button onClick={handleReload} className="reload-button">
              End Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestPage;

