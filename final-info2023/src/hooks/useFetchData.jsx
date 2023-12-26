import { useEffect, useState } from 'react';

function useDataFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        setData([]);
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          throw new Error('Error cargando datos.');
        }
        setIsLoading(false);
        setError('');
        setData(data);
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
        setData([]);
      }
    };

    fetchData();
  }, [url]);
  return { data, error, isLoading };
}

export default useDataFetch;
