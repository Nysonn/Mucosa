import { useState } from 'react';

const useSubmitProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /**
   * submitProject
   * Sends the provided project data to the backend.
   * @param {Object} data - The project submission data.
   * @returns {Object|null} - The response data from the backend or null in case of error.
   */
  const submitProject = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create a FormData instance to handle file upload alongside other fields.
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        // Ensure that we only append valid values.
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      // Adjust the URL to match your Django backend endpoint.
      const response = await fetch('http://localhost:8000/projects/submit-project/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Attempt to parse error details from the backend.
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit project');
      }

      setSuccess(true);
      return await response.json();
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitProject, loading, error, success };
};

export default useSubmitProject;
