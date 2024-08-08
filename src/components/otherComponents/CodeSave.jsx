const saveCodeToBackend = async (problemId, code) => {
console.log('problemId isdsss ->',problemId)
    const userId= localStorage.getItem('userId');
    console.log('hey im in code save',problemId);
    
    try {
      const saveUrl = "http://localhost:3000/codeSave";
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