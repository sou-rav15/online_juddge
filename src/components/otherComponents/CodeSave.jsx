const saveCodeToBackend = async (problemId, code) => {
console.log('problemId isdsss ->',problemId)
    const userId= localStorage.getItem('userId');
    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = 'https://bcknd.codehub.org.in';
    // console.log('hey im in code save',problemId);
    
    try {
      const saveUrl = `${apiUrl}/codeSave`;
      const savePayload = {
        problem_id: problemId,
        userId, // Replace with the actual userId
      
        code,
      };
      console.log('payload', savePayload)
      const saveResponse = await fetch(saveUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savePayload),
      });
      const saveResult = await saveResponse.json();
      console.log('Code saved:', saveResult);
    } catch (error) {
      console.error('Error saving code:', error);
    }
  };

  export default saveCodeToBackend;