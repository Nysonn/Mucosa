import { useState, useEffect } from 'react';

export function usePartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/partners/partners')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch partners data');
        }
        return response.json();
      })
      .then(data => {
        setPartners(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { partners, loading, error };
}
