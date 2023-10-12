import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import RecentsNews from '../RecentsNews/RecentsNews';
import Release from '../../pages/Release';
import New from '../../pages/New';
import Favorites from '../../pages/Favorites';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <RecentsNews /> } />
        <Route path="/release" element={ <Release /> } />
        <Route path="/new" element={ <New /> } />
        <Route path="/favorites" element={ <Favorites /> } />
      </Route>
    </Routes>
  );
}
