import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader.jsx';

const Home = lazy(() => import('./pages/Home'));
const Country = lazy(() => import('./pages/Country.jsx'));
const SearchCountry = lazy(() => import('./pages/SearchCountry.jsx'));
const Notfound = lazy(() => import('./pages/Notfound'));

{/* //у роуті під капотом SWITCH  */}
// Header без lazy, тому що lazy це асинхронщина, а ми хочемо, щоб голова була відразу на сторінці
export const App = () => {
  return (
    <>
    <Header /> 
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/country' element={<SearchCountry/>} />
      <Route path='/country/:countryId' element={<Country/>} />
      <Route path='*' element={<Notfound />} />
    </Routes>
    </Suspense>
    </>
  );
};
