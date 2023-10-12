import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function NavBar() {
  return (
    <nav className="filters">
      <NavLink to="/">Mais recentes</NavLink>
      <NavLink to="/release">Release</NavLink>
      <NavLink to="/new">Notícia</NavLink>
      <NavLink to="/favorites">Favoritos</NavLink>
    </nav>
  );
}
