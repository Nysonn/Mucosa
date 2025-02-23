import { useMutation } from '@tanstack/react-query';

const useSubmitProject = () => {
  const mutation = useMutation({
    mutationFn: async (data) => {
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

      return response.json();
    },
  });

  return { status: mutation.status, submitProject: mutation.mutate };
};

export default useSubmitProject;
