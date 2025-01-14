import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // For toggle arrows
import { Bar } from 'react-chartjs-2'; // Import Bar chart component
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import './Profile.css'; // For custom CSS styles
import { ThreeDots } from 'react-loader-spinner'; // Import a specific loader
import { Link, useNavigate } from 'react-router-dom';
import Timer from '../otherComponents/Timer/Timer';
import { useAuth } from '../Authentication/Authenticaton';
import { HandleError } from '../../utils';
import { useTheme } from '../Themes/Themes';

// Register all necessary components from Chart.js
Chart.register(...registerables);

const ProfilePage = () => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  // const apiUrl = 'http://localhost:3000';
  const apiUrl = 'https://bcknd.codehub.org.in';
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const userId = localStorage.getItem('userId');

  // State for toggling sections
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [admin, setShowadmin] = useState(false);
  const { isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const { isDark } = useTheme();
const gender = localStorage.getItem('gender');
  useEffect(() => {
    const fetchProfileData = async () => {
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };
      try {
        setLoading(true); // Start loading
        const response = await fetch(`${apiUrl}/Profile/${userId}`, headers);
        if (!response.ok) {
          HandleError('Failed to fetch profile dataaaa', isDark)
          // throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        console.log('profiledata->',data);

        setProfile(data);
      } catch (error) {
        // console.error('Error fetching profile data:', error);
        // HandleError('Failed to fetch profile data');
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchProfileData();
  }, [userId, apiUrl]);
  if (!isAuthenticated) {
    navigate('/login');
        // return <div>Please log in to access the compiler.</div>; // Change the message as needed
      }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
  const problemsSolved = Array.isArray(profile.problemsSolved) ? profile.problemsSolved : [];
  const badges = Array.isArray(profile.badges) ? profile.badges : [];
  // Data for the acceptance rate graph
  const acceptanceRateData = {
    labels: ['Accepted', 'Rejected'],
    datasets: [
      {
        label: 'Acceptance Rate',
        data: [profile.acceptedCount||'NA', profile.rejectedCount||'NA'],
        backgroundColor: ['#4caf50', '#f44336'], // Green for accepted, red for rejected
      },
    ],
  };

  return (
    <>
    {/* <Timer/> */}
    <div className={`container mt-4 ${profile.isDarkMode ? 'dark-theme' : ''}`}>
      <div className="row">
        {/* Left Column */}
        <div className="col-md-3">
          <div className="bg-light p-3 mb-3">
            <h5>Settings</h5>
            <div onClick={() => setShowSettings(!showSettings)} className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }}>
              <span>Manage Account</span>
              {showSettings ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showSettings && (
              <ul className="list-unstyled">
                <li>Change Password</li>
                <li>Privacy Settings</li>
                <li>Profile Settings</li>
              </ul>
            )}
          </div>
{/* admim resourece */}
<div className="bg-light p-3 mb-3">
            <h5>Admin resources only</h5>
            <div onClick={() => setShowadmin(!admin)} className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }}>
              <span>Manage resources</span>
              {admin ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {admin && (
              <ul className="list-unstyled">
              <Link to="/CreateContest" className="mt-1 createcontest">CreateContest</Link>

                
              </ul>
            )}
          </div>
          <div className="bg-light p-3 mb-3">
            <h5>Help</h5>
            <div onClick={() => setShowHelp(!showHelp)} className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }}>
              <span>Contact Us</span>
              {showHelp ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showHelp && (
              <ul className="list-unstyled">
                <li>FAQs</li>
                <li>Support</li>
              </ul>
            )}
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-md-6 text-center">
          <div className="profile-header mb-3">
            {/* <img src={profile.image || 'clerk.png'} alt="Profile" className="rounded-circle" style={{ width: '100px', height: '100px' }} /> */}
            <img src={profile.image||gender==="Male"?'/male.png':gender==="Female"?'/female.png':''} alt="Profile" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
            <h3>{profile.username}</h3>
            <p>{profile.email} | Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="bg-light p-3 mb-3">
            <h5>Achievements</h5>
            <ul className="list-unstyled">
              {Array.isArray(profile.badges) && profile.badges.length > 0 ? (
                profile.badges.map((badge, index) => <li key={index}>{badge}</li>)
              ) : (
                <li>No badges earned yet.</li>
              )}
            </ul>
          </div>

          {/* Acceptance Rate Graph */}
          <div className="bg-light p-3 mb-3" style={{ height: '250px', width: '100%' }}>
            <h5>Acceptance Rate</h5>
            <Bar data={acceptanceRateData} options={{ maintainAspectRatio: false }} height={150} />
          </div>

          {/* Contest Details */}
          <div className="bg-light p-3 mb-3">
            <h5>Contests Participated</h5>
            {Array.isArray(profile.contests) && profile.contests.length > 0 ? (
              profile.contests.map((contest, index) => (
                <div key={index}>
                  <h6>{contest.name}</h6>
                  <p>{contest.details}</p>
                </div>
              ))
            ) : (
              <p>No contests participated yet.</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-3">
          <div className="bg-light p-3 mb-3">
            <h5>Bio</h5>
            <p>{profile.bio || 'No bio available.'}</p>
          </div>

          <div className="bg-light p-3 mb-3">
            <h5>Stats</h5>
            <p>Acceptance Rate: {profile.acceptanceRate||0}%</p>
            <p>Rank: {profile.rank||"NA"}</p>
            <p>Leaderboard Position: {profile.leaderboardPosition||"NA"}</p>
          </div>

          <div className="bg-light p-3">
            <h5>Questions Solved</h5>
            <p>{profile.solvedQuestions} out of {profile.totalQuestions}</p>
            <button onClick={() => setShowQuestions(!showQuestions)} className="btn btn-link">
              {showQuestions ? 'Hide Questions' : 'Show All Questions'}
            </button>
            {showQuestions && (
              <ul className="list-unstyled">
                {/* {profile.solvedQuestionsList.map((question, index) => (
                  <li key={index}>{question.title}</li>
                ))} */}
            
              </ul>
            )}
            
          </div>
        </div>
      </div>
      {showQuestions && (
          <div className="question-modal-overlay" onClick={() => setShowQuestions(false)}>
            <div className="question-modal" onClick={(e) => e.stopPropagation()}>
              <h4>Attempted Questions</h4>
              <ul className="">
              {problemsSolved.length > 0 ? (
              problemsSolved.map((problem, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{problem.title}</span>
                  <span>{new Date(problem.submittedAt).toTimeString()}</span> {/* Format the date */}
                  <span className={`badge ${problem.status === 'Accepted' ? 'bg-success' : 'bg-danger'}`}>
                    {problem.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="list-group-item">No problems solved yet.</li>
            )}

              </ul>
                    
              <button className="btn btn-secondary mt-3" onClick={() => setShowQuestions(false)}>
                Close
              </button>
            </div>
          </div>
        )}
  
      <ToastContainer />
    </div>
    </>
   
  );
};

export default ProfilePage;
