import { useState } from 'react';

const useSubmitProject = () => {
  const [status, setStatus] = useState('');

  /**
   * submitProject
   * Sends the project submission data to the backend using multipart/form-data.
   *
   * @param {Object} data - The project submission data.
   * @returns {Object|null} - The backend response data or null if an error occurs.
   */
  const submitProject = async (data) => {
    setStatus('sending');
    try {
      // Create a FormData instance to handle file upload alongside other fields.
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await fetch('http://localhost:8000/projects/submit-project/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit project');
      }

      setStatus('success');
      return await response.json();
    } catch (err) {
      setStatus('error');
      return null;
    }
  };

  return { status, submitProject };
};

export default useSubmitProject;
