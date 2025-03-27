import { useState, useEffect } from 'react';
import axios from 'axios';

type Data = {
  name:string,
  imageUrl:string,
  type:string
};

const useFetchData = () => {
  const [data, setData] = useState<Data[] | null>(null);  // Type for data
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get('https://backendplaces-9uzl.onrender.com/food');
        setData(result.data.data);  // For simplicity, just get the first user
      } catch (error) {
        console.error('Error fetching data:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty dependency array means it runs only once after the component mounts

  return { data, loading };
};

export default useFetchData;
