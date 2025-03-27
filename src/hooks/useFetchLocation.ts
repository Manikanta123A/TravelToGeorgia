import { useState, useEffect } from 'react';
import axios from 'axios';

type Data = {
  name: string;
  lattitude:number,
  longitude:number,
  humour:string
};
type UserData = {
    name:string,
    lattitude:number,
    longitude:number
}

const useFetchData = () => {
  const [data, setData] = useState<Data[] | null>(null);  // Type for data
  const [userData, setUserData] = useState<UserData[]|null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get('https://backendplaces-9uzl.onrender.com/location/all');
        setData(result.data.places);  // For simplicity, just get the first user
        const re = await axios.get('https://backendlocationchat.onrender.com/user/all');
        setUserData(re.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty dependency array means it runs only once after the component mounts

  return { data, userData, loading };
};

export default useFetchData;
