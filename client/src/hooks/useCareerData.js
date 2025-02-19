import { useState, useEffect } from 'react';

// Hook to fetch roadmap data
export function useRoadmapData() {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/career/roadmap')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap data');
        }
        return response.json();
      })
      .then(data => {
        setRoadmapData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { roadmapData, loading, error };
}

// Hook to fetch job opportunities data
export function useJobsData() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/career/jobs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }
        return response.json();
      })
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { jobs, loading, error };
}

// Hook to fetch resources data
export function useResourcesData() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/career/resources')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch resources data');
        }
        return response.json();
      })
      .then(data => {
        setResources(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { resources, loading, error };
}
