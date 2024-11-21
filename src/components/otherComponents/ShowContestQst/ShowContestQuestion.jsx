
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ShowContestQuestion.css';
import Loader from '../Loading/Loading.jsx';
import { useTimer } from '../Timer/TimerContext.jsx';
import Timer from '../Timer/Timer.jsx';
import { useAuth } from '../../Authentication/Authenticaton.jsx';

const ShowContestQuestion = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('contest');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const{isAuthenticated}=useAuth();
 // const apiUrl = 'https://bcknd.codehub.org.in';
 const apiUrl='http://localhost:3000';
  const { active, startTimer } = useTimer(); // Only using what's needed

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`${apiUrl}/contestQuestion/${id}`);
        const data = await response.json();
        setTitle(data.questions.title);
        setQuestions(data.questions.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [id, apiUrl]);

  useEffect(() => {
    const endTime = localStorage.getItem('endTime');

    if (endTime) {
      const remainingTime = Math.floor((endTime - Date.now()) / 1000);
      if (remainingTime > 0) {
        startTimer(remainingTime); // Start timer with remaining time
      } else {
        // Handle expired timer (optional)
        console.log('timer is end');
        
      }
    }
  }, [startTimer]);

  const handleSolve = (contestId, Qtitle) => {
    navigate(`/ContestQuestions/${contestId}/${Qtitle}`);
  };
  const handleBack=()=>{
    navigate(-1);
  }
  if (!isAuthenticated) {
   
    return <div>
      <p className='ms-2'>Invalid token , token is required to acces this resources, please login..</p>
    </div>; // Prevent rendering until navigation occurs
}
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="contest-container">
      <button onClick={handleBack} className='back-button'>
            Back  
      </button>
      <Timer /> {/* Timer component that reads from useTimer */}
      <h1 className="contest-title">{title}</h1>

      <div className="questions-container">
        {questions.map((question) => (
          <div key={question._id} className="question-box">
            <h3>{question.title}</h3>
            <button className="solve-button" onClick={() => handleSolve(id, question.title)}>
              Solve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowContestQuestion;
