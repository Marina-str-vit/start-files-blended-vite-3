import { useEffect, useState } from "react";
import { getCountries } from "../service/countryApi";


export const useFetch = () => {
      const [countries, setCountries] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
      useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const data = await getCountries();
            setCountries(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      }, []);
  return {countries, isLoading , error} 
}