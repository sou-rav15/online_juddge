const handleProblemSubmission = async (problemId, submissionStatus) => {
    const userId = localStorage.getItem('userId');
    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = 'https://backend.codehub.org.in';
        if (!userId) {
        console.error('User ID is missing from local storage');
        return;
    }
    // console.log('user id here ->', userId);
    // console.log('problem id->',problemId);
    
// console.log('status is->..', submissionStatus);
const headers={
    headers:{
      'Authorization':localStorage.getItem('token')
    }
  }
    let problemTitle = '';
    try {
        const response = await fetch(`${apiUrl}/Problems/${problemId}`,headers);
        
        // Check if response is okay
        if (!response.ok) {
            throw new Error(`Failed to fetch problem data: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Check if title exists in data
        if (!data.title) {
            throw new Error('Problem data does not contain title');
        }

        problemTitle = data.title;
        // console.log('problem data is->', data);
    } catch (error) {
        console.error('Error fetching problem data:', error);
        return; // Exit the function if fetching problem data fails
    }

    const submissionData = {
        problemId,
        status: submissionStatus,
        submittedAt: new Date(),
        title: problemTitle,
    };

    try {
        const response = await fetch(`${apiUrl}/Profile/${userId}/submit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update profile: ${response.statusText}`);
        }

        const updatedProfile = await response.json();
        // console.log('Profile updated:', updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

export default handleProblemSubmission;
