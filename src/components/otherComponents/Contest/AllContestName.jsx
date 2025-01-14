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
   const apiUrl = 'https://bcknd.codehub.org.in';
  //  const apiUrl='http://localhost:3000';
  const { isAuthenticated } = useAuth(); 
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`${apiUrl}/contestQuestion`);
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

