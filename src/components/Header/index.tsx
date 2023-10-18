import trybeLogo from '../../assets/trybe-logo.svg';
import style from './header.module.css';

export default function Header() {
  return (
    <header>
      <img src={ trybeLogo } alt="heading-logo" />

      <div className={ style.header }>
        <h1>TRYBE NEWS</h1>
      </div>
    </header>
  );
}
