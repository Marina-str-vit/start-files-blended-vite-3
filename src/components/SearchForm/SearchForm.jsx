import { FiSearch } from 'react-icons/fi';
import styles from './SearchForm.module.css'
import { useState } from 'react';

const regions = [
  { id: 'africa', value: 'africa', name: 'Africa' },
  { id: 'america', value: 'america', name: 'America' },
  { id: 'asia', value: 'asia', name: 'Asia' },
  { id: 'europe', value: 'europe', name: 'Europe' },
  { id: 'oceania', value: 'oceania', name: 'Oceania' },
];

// Увага ЦЕ ФУНКЦ. КОЛБЕК!!  Тому у параметр прилітають дані з зовні!!

const SearchForm = ({onSubmit}) => {
  const [query, setQuery] = useState('');

  //обробник події виберу
  const handleChange = e =>{
    setQuery(e.target.value)
  }

  // тут  onSubmit(query) отримує значення і йде до компоненту SearchCountry стр.39-40 велью і є onSubmit(query)
  const handleSubmit =e =>{
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  }
  return <form className={styles.form} onSubmit={handleSubmit}>
  <button className={styles.button} type="submit">
    <FiSearch size="16px" />
  </button>

  <select
    aria-label="select"
    className={styles.select}
    name="region"
    onChange={handleChange}
    required
    defaultValue="default"
  >
    <option disabled value="default">
      Select a region
    </option>
    {
      regions.map(({id, value, name})=><option key={id} value={value}>{name}</option>)
    }
    
  </select>
</form>;
};

export default SearchForm;
