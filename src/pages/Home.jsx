import { useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { useEffect } from 'react';
import { getCountries } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import Country from './Country';
import CountryList from '../components/CountryList/CountryList';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect асинхрон, але не може одразу приймати async, тому в нутрі створюємо нову функц.
  useEffect(()=>{
    const fetchData = async()=>{
      setIsLoading(true);
      try{
        const data = await getCountries();
        setCountries(data);
      } catch (error){
        setError(error.message);
      } finally{
        setIsLoading(false); // обов'язково вимкнути
      }
    };
    fetchData();//викликаємо функц.
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader/>}
        {error && (
          <Heading
            title={`Oops! Something went wrong ... Error: ${error} `}
            bottom
          />
        )}
        {countries.length >0 && <CountryList countries={countries}/>}
      </Container>
    </Section>
  );
};
export default Home; // обов'язково завжди по дефолту, бо ляже сайт
