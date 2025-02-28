import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { fetchByRegion } from '../service/countryApi';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';

const SearchCountry = () => {
const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // тут сетер, гетер   тут йде запис даних
  const [searchParams, setSearchParams] = useSearchParams(); // працює як локал сторідж

// див. строку. 42 звідти записали дані в константу
  const region = searchParams.get("region")

// useEffect виконується в останній момент
// setCountries(data) отримали з const region 
  useEffect(() => {
    if(!region) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [region]); // якщо з region, щось буде відбуватися одразу буде реагувати цей useEffect




  const onHandleSubmit = value =>{
    setSearchParams({region: value}) //зберігає вибрані мною дані
  }
  //location.search = "?region=africa" те, що під капотом


  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onHandleSubmit}/>
        {isLoading && <Loader />}
        {error && (
          <Heading
            title={`Oops! Something went wrong ... Error: ${error} `}
            bottom
          />
        )}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};

export default SearchCountry;