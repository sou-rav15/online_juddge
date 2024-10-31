// // Loading.js
// import React from 'react';
// import { ThreeDots } from 'react-loader-spinner';
// const Loading = () => {
//     return <div><p>loading...</p></div>
// //     return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
// //     <ThreeDots color="#00BFFF" height={80} width={80} />
// //   </div>; // You can customize this
// };

// export default Loading;

// Loader.jsx
import React from 'react';
import './Loader.css'; // Optional CSS for styling

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;

