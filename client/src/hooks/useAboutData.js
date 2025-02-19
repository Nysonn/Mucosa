import { useState, useEffect } from 'react';

/**
 * Hook to fetch team members data from the backend.
 */
export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/about/team')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        return response.json();
      })
      .then(data => {
        setTeamMembers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { teamMembers, loading, error };
}

/**
 * Hook to fetch impact metrics data from the backend.
 */
export function useImpactMetrics() {
    const [impactMetrics, setImpactMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:8000/about/impact')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch impact metrics');
          }
          return response.json();
        })
        .then(data => {
          setImpactMetrics(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, []);
  
    return { impactMetrics, loading, error };
  }  

/**
 * Hook to handle contact form submissions.
 */
export function useContactForm() {
  const [status, setStatus] = useState('');

  const submitForm = async (formData) => {
    setStatus('sending');
    try {
      const response = await fetch('http://localhost:8000/about/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return { status, submitForm };
}
