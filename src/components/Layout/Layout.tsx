import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Filters from '../NavBar/NavBar';
import HeroNew from '../HeroNew/HeroNew';

export default function Layout() {
  return (
    <main>
      <Header />
      <HeroNew />
      <Filters />
      <Outlet />
    </main>
  );
}
