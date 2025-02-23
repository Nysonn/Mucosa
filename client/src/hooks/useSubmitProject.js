import { useState } from 'react';

const useSubmitProject = () => {
  const [status, setStatus] = useState('idle');

  const submitProject = async (data) => {
    setStatus('sending'); // Set status to 'sending' when submission begins
    // Create a FormData instance to handle file uploads alongside other fields.
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch('http://localhost:8000/projects/submit-project/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit project');
      }

      const json = await response.json();
      setStatus('success'); // Update status on success
      return json;
    } catch (error) {
      setStatus('error'); // Update status on error
      return null;
    }
  };

  return { status, submitProject };
};

export default useSubmitProject;
