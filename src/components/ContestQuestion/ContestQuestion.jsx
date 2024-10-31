import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Compiler2 from '../otherComponents/Compiler2.jsx';
import { useTheme } from '../Themes/Themes.jsx';
import { useTimer } from '../otherComponents/Timer/TimerContext.jsx';
import './ProblemDetail.css';

function ContestQuestions() {
  const { contestId, Qtitle } = useParams();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState();
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0); // Use state to track remaining time
  const apiUrl = 'http://localhost:8000';
  const { active, startTimer } = useTimer();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${apiUrl}/contestQuestion/${contestId}`);
        const data = await response.json();
        const questionInArray = data.questions.questions;
        const answer = questionInArray.find(q => q.title === Qtitle);
        setQuestions(answer);
      } catch (error) {
        console.error("Error fetching contest questions:", error);
      }
    };

    fetchQuestions();
  }, [contestId, Qtitle]);

  useEffect(() => {
    const endTime = localStorage.getItem('endTime');
    if (endTime) {
      const remaining = Math.floor((endTime - Date.now()) / 1000);
      if (remaining > 0) {
        setRemainingTime(remaining);
        startTimer(remaining); // Start the timer with remaining time
      } else {
        setShowCompletionMessage(true); // Show completion message if time has already expired
      }
    }
  }, [startTimer]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer); // Stop timer when time is up
            setShowCompletionMessage(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const handleEndTest = () => {
    setShowCompletionMessage(false);
    navigate(-2); // Navigate two steps back in history
  };
  const handleBack=()=>{
    navigate(-1);
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (!questions) return <div>Loading question or question not found...</div>;

  return (
    <div className={`container-fluid mt-4 ${isDark ? 'dark' : ''}`}>
      {showCompletionMessage ? (
        <div className="completion-message-box">
          <div className="message-content">
            <p>Thank you for participating in the contest. We will announce the results soon.</p>
            <button onClick={handleEndTest} className="exit-button">
              Exit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-auto">
              <h1 className={`${isDark ? 'text-light' : 'text-dark'}`}>{questions.title}</h1>
            </div>
            <div className="col-auto">
              <h4 className={`timer ${isDark ? 'text-warning' : 'text-primary'}`}>
                Time Left: {formatTime(remainingTime)}
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className={`card ${isDark ? 'bg-dark text-light' : 'bg-light'}`}>
                <div className="card-body">
                <span><img onClick={handleBack} className="back-arrow" src="/backArrow.png" alt="backArrow" /></span>

                  <h5>Description</h5>
                  <p>{questions.description}</p>

                  {questions.note && questions.note.trim() && (
                    <>
                      <h5>Note</h5>
                      <p>{questions.note}</p>
                    </>
                  )}

                  <h5>Constraints</h5>
                  <ul>
                    {questions.constraints.split('\n').map((constraint, i) => (
                      <li key={i}>{constraint}</li>
                    ))}
                  </ul>

                  <h5>Examples</h5>
                  <div>
                    {questions.examples.map((example) => (
                      <div key={example._id}>
                        <p>Input: {example.input}</p>
                        <p>Output: {example.output}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`card ${isDark ? 'bg-dark text-light' : 'bg-light'}`}>
                <div className="card-body">
                  <h5>Your Code</h5>
                  <Compiler2 />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ContestQuestions;
