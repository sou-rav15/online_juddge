// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { HandleError } from '../../utils';
// import { ToastContainer} from 'react-toastify';


// const ProfilePage = () => {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [profile, setProfile] = useState(null);
//   const userId= localStorage.getItem('userId');
//   // console.log('user id->',userId);
  
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/Profile/${userId}`);
      

//         if (!response.ok) {
//           throw new Error('Failed to fetch profile data');
//           // HandleError('Data Is Not Available ');
//         }
//         const data = await response.json();
//         setProfile(data);
//         // console.log('profile data->',data);
       
//       } catch (error) {
//         console.error('Error fetching profile data:', error)
//       }

//     };

//     fetchProfileData();
//   }, [userId]);

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   // Check if problemsSolved is an array before mapping over it
//   const problemsSolved = Array.isArray(profile.problemsSolved) ? profile.problemsSolved : [];

//   return (
//     <div className="container mt-4">
//       <h1>{profile.username}'s Profile</h1>
//       <div className="card mt-3">
//         <div className="card-body">
//           <h5 className="card-title">User Details</h5>
//           <p className="card-text">Name: {profile.name}</p>
//           <p className="card-text">Age: {profile.age}</p>
//           <p className="card-text">Email: {profile.email}</p>
//           <p className="card-text">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
//         </div>
//       </div>

//       <div className="card mt-3">
//         <div className="card-body">
//           <h5 className="card-title">Problem Solving Status</h5>
//           <ul className="list-group">
//             {problemsSolved.length > 0 ? (
//               problemsSolved.map((problem) => (
//                 <li key={problem.problemId} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span>{problem.title}</span>
//                   <span>{problem.submittedAt}</span>
//                   <span className={`badge ${problem.status === 'Accepted' ? 'bg-success' : 'bg-danger'}`}>
//                     {problem.status}
//                   </span>
//                 </li>
//               ))
//             ) : (
//               <li className="list-group-item">No problems solved yet.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//          <ToastContainer/>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Ensure you include this CSS

const ProfilePage = () => {
  // const apiUrl = import.meta.env.VITE_API_URL;
  // const apiUrl = 'https://bcknd.codehub.org.in';
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfileData = async () => {
      const headers={
        headers:{
          'Authorization':localStorage.getItem('token')
        }
      }
      try {
        const response = await fetch(`${apiUrl}/Profile/${userId}`,headers);

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to fetch profile data'); // Show a toast notification
      }
    };

    fetchProfileData();
  }, [userId, apiUrl]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  // Check if problemsSolved is an array before mapping over it
  const problemsSolved = Array.isArray(profile.problemsSolved) ? profile.problemsSolved : [];
  const badges = Array.isArray(profile.badges) ? profile.badges : [];

  return (
    <div className="container mt-4">
      <h1>{profile.username}'s Profile</h1>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">User Details</h5>
          <p className="card-text">Name: {profile.name}</p>
          <p className="card-text">Age: {profile.age}</p>
          <p className="card-text">Email: {profile.email}</p>
          <p className="card-text">Badges:</p>
          <ul className="list-group mb-3">
            {badges.length > 0 ? (
              badges.map((badge, index) => (
                <li key={index} className="list-group-item">
                  {badge}
                </li>
              ))
            ) : (
              <li className="list-group-item">No badges earned yet.</li>
            )}
          </ul>

          <p className="card-text">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Problem Solving Status</h5>
          <ul className="list-group">
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
        </div>
      </div>
      <ToastContainer /> {/* Ensure toast notifications are displayed */}
    </div>
  );
};

export default ProfilePage;
